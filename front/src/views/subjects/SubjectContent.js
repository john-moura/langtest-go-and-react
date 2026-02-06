import React, { useState } from 'react'

import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import { cibReadme } from '@coreui/icons'
import TestList from '../tests/TestList';

const SubjectContent = ({ subjectInfo, tests, concludedTests }) => {

  const [activeKey, setActiveKey] = useState(1)
  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>{subjectInfo.name} tests</CNavLink>
        </CNavItem>
        <CNavItem>
            <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>Concluded</CNavLink>
        </CNavItem>
      </CNav>
      <br></br>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="new-tab" visible={activeKey === 1}>
          <TestList className="mb-4" tests={tests} icon={subjectInfo.icon} subjectName={subjectInfo.name} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="concluded-tab" visible={activeKey === 2}>
          <TestList className="mb-4" tests={concludedTests} icon={subjectInfo.icon} subjectName={subjectInfo.name} />
        </CTabPane>
      </CTabContent>

    </>
  )
}

export default SubjectContent
