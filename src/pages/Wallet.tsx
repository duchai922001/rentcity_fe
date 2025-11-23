import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Tabs,
  Table,
  Modal,
  Button,
  Select,
  Input,
  Form,
  InputNumber,
  message,
  Tag,
  Space,
  Spin,
} from "antd";
import { UserService } from "../services/user.service";
import { WithdrawalRequestService } from "../services/withdrawalRequest.service";

const { TabPane } = Tabs;
const { TextArea } = Input;

type RequestItem = {
  id: number;
  user?: { id: number; firstName: string; lastName: string; phone?: string };
  amount: number;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" | string;
  adminNote?: string | null;
  createdAt?: string;
};

export default function Wallet() {
  const [users, setUsers] = useState<any[]>([]);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  // Modal states
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject" | "complete" | null;
    request?: RequestItem | null;
  }>({ type: null, request: null });
  const [rejectNote, setRejectNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Form for creating withdraw request
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
    loadRequests(); // load all by default
  }, []);

  useEffect(() => {
    // when tab changes, load requests for that status
    loadRequests();
  }, [activeTab]);

  const loadUsers = async () => {
    try {
      const res = await UserService.getAllUsers();
      // res may be array or { data: [...] }
      setUsers(Array.isArray(res) ? res : res?.data ?? []);
    } catch (err) {
      console.error(err);
      message.error("Không tải được danh sách user");
    }
  };

  const loadRequests = async () => {
    setLoading(true);
    try {
      const statusMap: Record<string, string | undefined> = {
        ALL: undefined,
        PENDING: "PENDING",
        APPROVED: "APPROVED",
        COMPLETED: "COMPLETED",
        REJECTED: "REJECTED",
      };
      const status = statusMap[activeTab];
      const res = await WithdrawalRequestService.getAllRequests(status);
      setRequests(Array.isArray(res) ? res : res?.data ?? []);
    } catch (err) {
      console.error(err);
      message.error("Không tải được danh sách yêu cầu rút tiền");
    } finally {
      setLoading(false);
    }
  };

  // Create withdraw request
  const handleCreateRequest = async (values: any) => {
    setSubmitting(true);
    try {
      await WithdrawalRequestService.createRequest(Number(values.userId), {
        amount: values.amount,
        bankName: values.bankName,
        bankAccountNumber: values.bankAccountNumber,
        bankAccountHolder: values.bankAccountHolder,
      });
      message.success("Tạo yêu cầu rút tiền thành công");
      setWithdrawModalVisible(false);
      form.resetFields();
      await loadRequests();
    } catch (err) {
      console.error(err);
      message.error("Tạo yêu cầu thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  // Open confirm modal for actions
  const openConfirm = (
    type: "approve" | "reject" | "complete",
    request: RequestItem
  ) => {
    setConfirmAction({ type, request });
    setRejectNote("");
    setConfirmModalVisible(true);
  };

  const handleConfirmAction = async () => {
    const { type, request } = confirmAction;
    if (!type || !request) return;

    setSubmitting(true);
    try {
      if (type === "approve") {
        await WithdrawalRequestService.approveRequest(request.id);
        message.success("Đã duyệt yêu cầu");
      } else if (type === "complete") {
        await WithdrawalRequestService.completeRequest(request.id);
        message.success("Đã đánh dấu hoàn tất");
      } else if (type === "reject") {
        // require note
        if (!rejectNote.trim()) {
          message.warning("Vui lòng nhập lý do từ chối");
          setSubmitting(false);
          return;
        }
        await WithdrawalRequestService.rejectRequest(request.id, {
          adminNote: rejectNote,
        });
        message.success("Đã từ chối yêu cầu");
      }
      setConfirmModalVisible(false);
      setConfirmAction({ type: null, request: null });
      await loadRequests();
    } catch (err) {
      console.error(err);
      message.error("Xử lý thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const statusTag = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Tag color="gold">Chờ duyệt</Tag>;
      case "APPROVED":
        return <Tag color="blue">Đã duyệt</Tag>;
      case "COMPLETED":
        return <Tag color="green">Hoàn tất</Tag>;
      case "REJECTED":
        return <Tag color="red">Bị từ chối</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "Người yêu cầu",
      dataIndex: ["user"],
      key: "user",
      render: (user: any) =>
        user ? `${user.firstName} ${user.lastName}` : "—",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (v: number) => new Intl.NumberFormat("vi-VN").format(v) + " VND",
    },
    {
      title: "Ngân hàng / Số tài khoản",
      key: "bank",
      render: (record: RequestItem) => (
        <div>
          <div className="font-medium">{record.bankName}</div>
          <div className="text-sm text-gray-500">
            {record.bankAccountNumber}
          </div>
          <div className="text-sm text-gray-500">
            {record.bankAccountHolder}
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (s: string) => statusTag(s),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d: string) => (d ? new Date(d).toLocaleString() : "—"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: RequestItem) => {
        const s = record.status;
        return (
          <Space>
            {s === "PENDING" && (
              <>
                <Button
                  type="primary"
                  onClick={() => openConfirm("approve", record)}
                >
                  Duyệt
                </Button>
                <Button danger onClick={() => openConfirm("reject", record)}>
                  Từ chối
                </Button>
              </>
            )}

            {s === "APPROVED" && (
              <Button
                type="default"
                onClick={() => openConfirm("complete", record)}
              >
                Đã chuyển tiền
              </Button>
            )}

            {/* no actions for COMPLETED / REJECTED */}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý rút tiền</h1>
          <p className="text-sm text-gray-600">
            Quản lý và xử lý yêu cầu rút tiền
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="primary"
            icon={<Plus />}
            onClick={() => setWithdrawModalVisible(true)}
          >
            Tạo yêu cầu rút tiền
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          type="card"
        >
          <TabPane tab="Tất cả" key="ALL" />
          <TabPane tab="Đang chờ duyệt" key="PENDING" />
          <TabPane tab="Đã duyệt" key="APPROVED" />
          <TabPane tab="Đã hoàn tất" key="COMPLETED" />
          <TabPane tab="Bị từ chối" key="REJECTED" />
        </Tabs>

        <div className="mt-4">
          {loading ? (
            <div className="w-full flex items-center justify-center py-8">
              <Spin />
            </div>
          ) : (
            <Table
              rowKey="id"
              dataSource={requests}
              columns={columns}
              pagination={{ pageSize: 8 }}
            />
          )}
        </div>
      </div>

      {/* Modal: Create withdraw request */}
      <Modal
        title="Tạo yêu cầu rút tiền"
        open={withdrawModalVisible}
        onCancel={() => setWithdrawModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreateRequest}>
          <Form.Item
            name="userId"
            label="Chọn người yêu cầu"
            rules={[{ required: true, message: "Chọn user" }]}
          >
            <Select placeholder="Chọn user">
              {users.map((u) => (
                <Select.Option key={u.id} value={u.id}>
                  {u.firstName} {u.lastName} — {u.phone}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Số tiền (VND)"
            rules={[{ required: true, message: "Nhập số tiền" }]}
          >
            <InputNumber
              min={1000}
              style={{ width: "100%" }}
              formatter={(value) =>
                (value as any)
                  ? new Intl.NumberFormat("vi-VN").format(Number(value))
                  : ""
              }
              parser={(value) => (value ? value.replace(/\D/g, "") : "")}
            />
          </Form.Item>

          <Form.Item
            name="bankName"
            label="Ngân hàng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bankAccountNumber"
            label="Số tài khoản"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bankAccountHolder"
            label="Chủ tài khoản"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setWithdrawModalVisible(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Gửi yêu cầu
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Confirm Modal (Approve / Complete) and Reject (with note) */}
      <Modal
        title={
          confirmAction.type === "reject"
            ? "Từ chối yêu cầu rút tiền"
            : confirmAction.type === "approve"
            ? "Duyệt yêu cầu rút tiền"
            : confirmAction.type === "complete"
            ? "Xác nhận hoàn tất"
            : ""
        }
        open={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        onOk={handleConfirmAction}
        okButtonProps={{ loading: submitting }}
        okText={
          confirmAction.type === "reject"
            ? "Xác nhận từ chối"
            : confirmAction.type === "approve"
            ? "Xác nhận duyệt"
            : "Xác nhận hoàn tất"
        }
      >
        {confirmAction.type === "reject" ? (
          <>
            <p>Vui lòng nhập lý do từ chối:</p>
            <TextArea
              rows={4}
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="Lý do từ chối..."
            />
          </>
        ) : confirmAction.type === "approve" ? (
          <p>Bạn có chắc duyệt yêu cầu rút tiền này không?</p>
        ) : confirmAction.type === "complete" ? (
          <p>Xác nhận rằng tiền đã được chuyển cho người dùng?</p>
        ) : null}
      </Modal>
    </div>
  );
}
