import React from 'react'
import "../styles/knjiga.css"
import { Link } from 'react-router-dom'


export default function Knjiga({ id, coverImageName }) {
  return (
    <Link to={`/knjigadetalji/${id}`} className='knjigaLayout mt-3'>
        <img className='knjigaSlika' src={`/knjige/${coverImageName}`} alt="knjiga"/>
    </Link>
  )
}
