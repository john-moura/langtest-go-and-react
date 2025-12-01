import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsD } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { dashboardCards } from '@/data/dashboardCardData'
import { Link } from 'react-router-dom'

const DashboardCards = ({ className }) => {
  const [cards, setCards] = useState(dashboardCards);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${baseUrl}/dashboard`);
        if (!res.ok) return;
        const data = await res.json();

        const updatedCards = dashboardCards.map(card => {
          const score = data[card.name];
          if (score !== undefined) {
            return {
              ...card,
              values: [
                { title: 'Score', value: `${score}%` },
                { title: 'Weight', value: card.values[1].value }, // Keep weight
              ]
            };
          }
          return card;
        });
        setCards(updatedCards);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, [baseUrl]);

  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      {cards.map((card, index) => (
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
