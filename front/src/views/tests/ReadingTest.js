import React, { useEffect, useState } from 'react'

import TestView from './TestView';
import { useParams } from 'react-router-dom'

const ReadingTest = () => {

  const { id } = useParams()

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const [testInfo, setTestInfo] = useState([]);
  const [testParts, setTestParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTest = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/v1/test/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch test');
        }

        const data = await res.json();
        console.log('Fetched data:', data);
        setTestInfo(data.testInfo || []);
        setTestParts(data.testParts || []);
        console.log('testParts set to:', data.testParts);
      } catch (err) {
        console.error(err);
        setTestInfo([]);
        setTestParts([]);
      } finally {
        setLoading(false);
      }
    };

    getTest();
  }, [baseUrl]);

  return (
    <>
      <TestView testInfo={testInfo} testParts={testParts} />
    </>
  )

}

export default ReadingTest