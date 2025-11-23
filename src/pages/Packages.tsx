import React, { useEffect, useState } from "react";
import {
  Tabs,
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Tag,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { PackageService } from "../services/package.service";

interface PackageType {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
  priority: number;
}

interface UserPackageType {
  id: number;
  user: { id: number; firstName: string; lastName: string; phone: string };
  package: { id: number; name: string; price: number };
  startDate: string;
  endDate: string;
  active: boolean;
}

const AdminPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [userPackages, setUserPackages] = useState<UserPackageType[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [loadingUserPackages, setLoadingUserPackages] = useState(false);

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const data = await PackageService.getListPackages();
      setPackages(data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách gói");
    } finally {
      setLoadingPackages(false);
    }
  };

  const fetchUserPackages = async () => {
    setLoadingUserPackages(true);
    try {
      const data = await PackageService.getPackageUserBuy();
      setUserPackages(data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách người dùng mua gói");
    } finally {
      setLoadingUserPackages(false);
    }
  };

  const onCreatePackage = async (values: any) => {
    try {
      await PackageService.create(values);
      message.success("Tạo gói thành công");
      fetchPackages();
    } catch (error) {
      message.error("Lỗi khi tạo gói");
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchUserPackages();
  }, []);

  const packageColumns: ColumnsType<PackageType> = [
    { title: "Tên gói", dataIndex: "name", key: "name" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (v) => `${v.toLocaleString()} ₫`,
    },
    { title: "Thời hạn (ngày)", dataIndex: "duration", key: "duration" },
    { title: "Priority", dataIndex: "priority", key: "priority" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
  ];

  const userPackageColumns: ColumnsType<UserPackageType> = [
    {
      title: "Người mua",
      key: "user",
      render: (_, record) =>
        `${record.user.firstName} ${record.user.lastName} (${record.user.phone})`,
    },
    {
      title: "Gói",
      key: "package",
      render: (_, record) => record.package.name,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (v) => new Date(v).toLocaleDateString(),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (v) => new Date(v).toLocaleDateString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (v) =>
        v ? (
          <Tag color="green">Đang hoạt động</Tag>
        ) : (
          <Tag color="red">Hết hạn</Tag>
        ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Tabs
        items={[
          {
            key: "1",
            label: "Tạo gói",
            children: (
              <Form
                layout="vertical"
                onFinish={onCreatePackage}
                style={{ maxWidth: 400 }}
              >
                <Form.Item
                  label="Tên gói"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Giá"
                  name="price"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Thời hạn (ngày)"
                  name="duration"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Priority"
                  name="priority"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                  <Input.TextArea rows={3} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo
                </Button>
              </Form>
            ),
          },
          {
            key: "2",
            label: "Danh sách gói",
            children: (
              <Table
                rowKey="id"
                dataSource={packages}
                columns={packageColumns}
                loading={loadingPackages}
              />
            ),
          },
          {
            key: "3",
            label: "Người dùng mua gói",
            children: (
              <Table
                rowKey="id"
                dataSource={userPackages}
                columns={userPackageColumns}
                loading={loadingUserPackages}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminPackagesPage;
