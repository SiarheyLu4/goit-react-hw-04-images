import React from "react";
import { Bars } from 'react-loader-spinner';
import styled from "styled-components";

export const Loader = () => {
  return (
    <Spin>
      <Bars
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Spin>
  )
}

const Spin = styled.div`
  position: fixed;
    top:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
`