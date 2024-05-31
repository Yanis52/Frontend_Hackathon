import { useState, useEffect } from "react";
import { Table } from "antd";
import axios from 'axios';
import { useNavigate } from "react-router";

const columns = [
  {
    title: 'Athlete',
    dataIndex: 'Athlete',
    key: 'Athlete',
  },
  {
    title: 'Country',
    dataIndex: 'Country',
    key: 'Country',
  },
  {
    title: 'Medal_Count',
    dataIndex: 'Medal_Count',
    key: 'Medal_Count',
  },
];

Component.displayName = 'AthletesPage';

export function Component() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthletes = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`https://backend-hackathon-test2.vercel.app/athlete?page=${pagination.current}&pageSize=${pagination.pageSize}`);
        console.log(response.data)
        setData(response.data.result);
        setPagination(prev => ({ ...prev, total: response.data.pagination.totalItems }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);
  };


  const handleRowClick = (record: any) => {
    // Handle row click here. For example, navigate to a new page.
    console.log(record);
    navigate(`/athletes/athlete/${record.Athlete}`);

  };

  return (
    <div style={{ display: 'flex' }}>
      <Table
        style={{ width: '100%' }}
        columns={columns}
        rowKey={record => record.Athlete}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
}