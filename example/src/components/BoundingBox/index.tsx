import * as React from 'react'
import styled from 'styled-components'
import { BoundingBoxReturn } from 'react-tensorflow'

interface BoundingBoxProps {
    box: BoundingBoxReturn
    label?: string,
    probability?: number
}

const BoundingBox:React.FC<BoundingBoxProps> = ({box, label, probability}: BoundingBoxProps) => {
    const [left, top, width, height] = box
    return <Box style={{width, top, height, left }} label={label} probability={probability} />
}

export default BoundingBox

const Box = styled.div<Omit<BoundingBoxProps, 'box'>>`
    position: absolute;
    border: 0.2rem solid #3f51b5;
    border-radius: 0.4rem;

    &::before,
    &::after {
        display: block;
        position: absolute;
        bottom: 0;
        color: white;
        background: #3f51b5;
        padding: 0.3rem 0.6rem;
        font-size: 1.2rem;
        font-family: monospace;
    }

  &::before {
    content: "${({ label = 'no class provided' }) => label}";
    left: 0;
    border-radius: 0 0.4rem 0 0;
  }

  &::after {
    content: "${({ probability = 0 }) => Math.round(probability * 100)}%";
    right: 0;
    border-radius: 0.4rem 0 0 0;
  }
`
