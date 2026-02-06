import React, { useState } from 'react'

import {
  CCard,
  CCardBody,
  CButton,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CCardImage,
  CForm,
  CFormFeedback,
} from '@coreui/react'

import axios from 'axios';

const submitForm = async (formData) => {
  try {
    await axios.post('/readingtest', formData, {
      headers: {
        Authorization: `Bearer ${token}`, // from secure login
      },
    });
    alert('Form submitted successfully');
  } catch (err) {
    console.error('Submission error', err);
  }
};


const TestView = ({ testInfo, testParts }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(answerId)
    }));
  };

  const submitForm = async () => {
    setError(null);
    try {
      // Check if all questions are answered
      let allAnswered = true;
      testParts?.forEach(part => {
        part.questions?.forEach(q => {
          if (!answers[q.id]) allAnswered = false;
        });
      });

      if (!allAnswered) {
        alert("Please answer all questions before submitting.");
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/test/${testInfo.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit test');
      }

      const data = await res.json();
      setResult(data);
      window.scrollTo(0, 0); // Scroll to top to see score
    } catch (err) {
      console.error('Submission error', err);
      setError("Failed to submit test. Please try again.");
    }
  };

  const getQuestionResult = (questionId) => {
    if (!result) return null;
    return result.questionResults.find(r => r.questionId === questionId);
  };

  return (
    <>
      {result && (
        <CCard className="mb-4 border-success">
          <CCardBody className="text-center">
            <CCardTitle className="text-success">Test Completed!</CCardTitle>
            <div className="card-text">
              <h3>Score: {result.score} / {result.totalQuestions}</h3>
              <p>({Math.round((result.score / result.totalQuestions) * 100)}%)</p>
            </div>
          </CCardBody>
        </CCard>
      )}

      <CCard >
        <CCardBody>
          <CCardTitle>{testInfo?.category} - {testInfo?.name}</CCardTitle>
          <CCardText>
            {testInfo?.description}
          </CCardText>
        </CCardBody>
        <CListGroup flush>
          <CListGroupItem>Weight: {testInfo?.weight * 100}% | Duration: {testInfo?.duration} min</CListGroupItem>
        </CListGroup>
      </CCard>

      <br></br>
      <CForm>
        {testParts?.map((testPart, index) => (
          <React.Fragment key={index}>
            <CCard >
              <CCardBody>
                <CCardTitle>{testInfo?.category} - Teil {index + 1}</CCardTitle>
                <CCardText>{testPart.title}</CCardText>
              </CCardBody>
              <CListGroup flush>
                <CListGroupItem>
                  {testPart.descriptions?.map((description, descIndex) => (
                    <CCardText key={descIndex}>
                      {description.index ? (
                        <span>{description.index}. {description.text}</span>) : (<span>{description.text}</span>)}
                    </CCardText>
                  ))}
                </CListGroupItem>

                {testPart.questions?.map((question, qIndex) => {
                  const qResult = getQuestionResult(question.id);
                  const isCorrect = qResult?.isCorrect;
                  const cardStyle = result
                    ? { border: isCorrect ? '1px solid green' : '1px solid red' }
                    : {};

                  return (
                    <CListGroupItem key={qIndex} style={cardStyle}>

                      {question.index ? (
                        <p><span>{question.index}</span>. {question.text} </p>) : (
                        <p>{question.text}</p>
                      )}

                      {question.image ? (
                        <>
                          <CCard style={{ width: '18rem' }}>
                            {question.image ? (
                              <CCardImage variant="top" src={question.image} />) : null}
                          </CCard>
                          <br></br>
                        </>
                      ) : null}

                      {question.answers?.map((answer, aIndex) => {
                        const isSelected = answers[question.id] === answer.id;
                        const isCorrectAnswer = qResult?.correctAnswerId === answer.id;

                        let labelStyle = {};
                        if (result) {
                          if (isCorrectAnswer) labelStyle = { color: 'green', fontWeight: 'bold' };
                          else if (isSelected && !isCorrect) labelStyle = { color: 'red', textDecoration: 'line-through' };
                        }

                        return (
                          <div key={aIndex} style={labelStyle}>
                            <CFormCheck
                              inline
                              type="radio"
                              name={question.id.toString()}
                              id={answer.id.toString()}
                              value={answer.id}
                              label={answer.text}
                              checked={isSelected}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              disabled={!!result}
                            />
                            {result && isCorrectAnswer && <span> (Correct)</span>}
                            {result && isSelected && !isCorrect && <span> (Your Answer)</span>}
                          </div>
                        )
                      })}

                    </CListGroupItem>
                  )
                })}
              </CListGroup>
            </CCard>
            <br></br>

          </React.Fragment>
        ))}
        <br></br>
        {!result && (
          <CButton color="primary" onClick={() => submitForm()}>
            Conclude Test
          </CButton>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
      </CForm>
      <br></br>
    </>
  )
}

export default TestView
