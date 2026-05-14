import styled from "styled-components";

const SpinnerContainer = styled.div`
  opacity: 0;
  margin-top: 20px;
  border: 16px solid #5373e9ff;
  border-top: 16px #d6d6d6d3 solid;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  animation: spin 2s linear infinite, appear .3s ease-in forwards; 
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes appear {
    to { opacity: 1; }
  }
`;

export default function Spinner() {
  return (
    <SpinnerContainer />
  );
}
