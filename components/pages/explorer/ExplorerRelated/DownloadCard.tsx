import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import Image from 'next/image';
import { Download } from 'components/icons';
import ButtonComp from 'components/actions/Button/ButtonComp';

const DownloadCard = () => {
    return (
        <Wrapper>
            <Image
                src={"/assets/data_csv.svg"}
                height={44}
                width={44}
                alt=""
            />
            <Content>
                <p>
                    Dataset file name placeholder.pdf
                </p>
                <small>
                    Description text for the same file will come here
                </small>
            </Content>
            <ButtonContainer>
                <Button icon={<Download />} size="sm" kind="secondary">
                    <small>Download &nbsp; |</small>
                </Button>
            </ButtonContainer>
        </Wrapper>
    )
}


const Wrapper = styled.div`
   border:.5px solid black;
   padding:12px 16px 12px 16px;
   background: #F2EFF2;
   border: 1px solid #D1CDD1;
   border-radius: 4px;
   display: flex;
   flex-basis:484px;
   flex-grow:1;
`;

const ButtonContainer = styled.div`
   display:flex;
   align-items:center;
   margin-left: auto; 
   margin-right: 0;
   ${ButtonComp} {
     small {
       font-size:12px;
     }
     @media(max-width:600px){
       padding:8px;
       small{
         display:none;
       }
       svg {
        margin-inline-start: 0;
       }
     }
   }
`;

const Content = styled.div`
    padding-left:16px;
`;

export default DownloadCard;