import React from 'react'

export const Content = (props) => {
    debugger


    return (
        props.content.map( c => (
            <div key = {c.id}>
            <title>{c.BrowserTitle}</title>
            <h2>{c.Title}</h2>
            <p>{c.Content}</p>
            </div>
            ))
    )
}