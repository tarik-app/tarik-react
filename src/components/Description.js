import React from 'react';

export default function Description (props) {
  const {params} = props.match
  const {state} = props.location
  console.log(state)
return <p>Hello {params.title}</p>
}