import React from 'react'
import { CRow, CCol, CWidgetStatsD } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { dashboardCards } from '@/data/dashboardCardData'
import { Link } from 'react-router-dom'

const DashboardCards = ({ className }) => {
  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      {dashboardCards.map((card, index) => (
        <CCol lg={true} key={index}>
          {card.to ? (
            <Link to={card.to} style={{ textDecoration: 'none' }}>
              <CardContent card={card} />
            </Link>
          ) : (
            <CardContent card={card} />
          )}
        </CCol>
      ))}
    </CRow>
  )
}

const CardContent = ({ card }) => {
  return (
    <CWidgetStatsD
      color={card.color}
      icon={<CIcon icon={card.icon} height={52} className="my-4 text-white" />}
      values={card.values}
    />
  )
}

export default DashboardCards
