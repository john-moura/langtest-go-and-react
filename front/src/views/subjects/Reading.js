import React, { useEffect, useState } from 'react'
import { cibReadme } from '@coreui/icons'
import SubjectContent from './SubjectContent';


const Reading = ({ className }) => {

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [tests, setTests] = useState([]);
  const [subjectInfo, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubject = async () => {
      try {
        const res = await fetch(`${baseUrl}/subject/1`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch subject');
        }

        const data = await res.json();
        setTests(data.tests || []);
        setSubject(data.subject || []);
      } catch (err) {
        console.error(err);
        setTests([]);
        setSubject([]);
      } finally {
        setLoading(false);
      }
    };

    getSubject();
  }, [baseUrl]);

  return(
      <>
          <SubjectContent tests={tests} concludedTests={tests} subjectInfo={subjectInfo} />
      </>
  )

}

export default Reading