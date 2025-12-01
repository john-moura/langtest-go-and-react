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
  console.log('TestView received testInfo:', testInfo);
  console.log('TestView received testParts:', testParts);

  return (
    <>
      <CCard >
        <CCardBody>
          <CCardTitle>{testInfo.category} - {testInfo.name}</CCardTitle>
          <CCardText>
            {testInfo.description}
          </CCardText>
        </CCardBody>
        <CListGroup flush>
          <CListGroupItem>Weight: {testInfo.weight * 100}% | Duration: {testInfo.duration} min</CListGroupItem>
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

                {testPart.questions?.map((question, qIndex) => (

                  <CListGroupItem key={qIndex}>

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
                    {question.answers?.map((answer, aIndex) => (
                      <CFormCheck
                        key={aIndex}
                        inline
                        type="radio"
                        name={question.id.toString()}
                        id={answer.id.toString()}
                        value={answer.id}
                        label={answer.text}
                        required
                      />
                    ))}

                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCard>
            <br></br>

          </React.Fragment>
        ))}
        <br></br>
        <CButton color="primary" type="submit" onClick={() => submitForm()}>
          Conclude Test
        </CButton>
        <CFormFeedback invalid>Please answer all questions before submitting.</CFormFeedback>
      </CForm>
      <br></br>
    </>
  )
}

export default TestView
