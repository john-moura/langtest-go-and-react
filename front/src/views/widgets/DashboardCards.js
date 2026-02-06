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
        const res = await fetch(`${baseUrl}/dashboard`, {
          credentials: 'include',
        });
        if (!res.ok) return;
        const data = await res.json();

        const updatedCards = dashboardCards.map(card => {
          const score = data[card.name];
          // If score exists, use it. If not, default to 0% (or handle as needed)
          // The user requested "only real scores, no placeholders".
          // If "real scores" means "if user hasn't taken test, show 0% or -", let's assume 0% for now as a "real" starting state.
          // Or maybe we should hide the card? But usually we want to show available subjects.
          // Let's set it to 0% if undefined, so it's not a random placeholder number.

          const displayScore = score !== undefined ? score : 0;

          return {
            ...card,
            values: [
              { title: 'Score', value: `${displayScore}%` },
              { title: 'Weight', value: card.values[1].value }, // Keep weight
            ]
          };
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
