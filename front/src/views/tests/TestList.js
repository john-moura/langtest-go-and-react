import React from 'react'
import { CRow, CCol, CCard, CCardImage, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibReadme } from '@coreui/icons'
import { Link } from 'react-router-dom'


const TestList = ({ tests = [], icon, className, subjectName }) => {
  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      {tests.map((test, index) => (
        <CCol lg={true} key={index}>
          {test.id ? (
            <Link 
            to={{
                pathname: "/" + subjectName + "/test/" + test.id,
              }} style={{ textDecoration: 'none' }}>
              <CardContent test={test} icon={icon} />
            </Link>
          ) : (
            <CardContent test={test} icon={icon} />
          )}
        </CCol>
      ))}
    </CRow>
  )
}

const CardContent = ({ test, icon }) => {
  return (
    <CCard>
        <CCardBody>
            <CCardTitle>
                <div className="d-flex align-items-center gap-2">
                    <CIcon icon={icon} height={22} />
                    {test.name}
                </div>
            </CCardTitle>
            <CCardText>
                {test.description}
            </CCardText>
        </CCardBody>
    </CCard>
  )
}

export default TestList