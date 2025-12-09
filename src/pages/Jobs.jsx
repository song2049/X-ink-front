import { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import JobsCreateForm from '../components/Jobs/JobsCreateForm';
import JobsSetting from '../components/Jobs/JobsSetting';
import axios from 'axios';

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobExists, setJobExists] = useState(null);

  useEffect(() => {
    const JobExists = async () => {
      try {
        const res = await axios.get('http://localhost:3001/jobs/exists', {
          withCredentials: true, // 쿠키 포함 필수!
        });

        setJobExists(res.data.exists);
      } catch (error) {
        console.error('공고 존재 여부 확인 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    JobExists();
  }, []);

  if (loading) return <Layout>로딩중...</Layout>;
  return (
    <Layout>
      {jobExists === false ? <JobsCreateForm /> : <JobsSetting />}
    </Layout>
  );
};

export default Jobs;
