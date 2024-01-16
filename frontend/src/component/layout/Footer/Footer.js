import React from 'react';
import "./Footer.css"

function Footer(){
    return(
        <section className='footer' id='contact'>
        <div className='box-container'>
          <div className='box'>
            <h3>EmGadgets </h3>
            <a href='#' className='links'><i className='fas fa-phone'></i> +123456789</a>
              <a href='#' className='links'><i className='fas fa-envelope'></i> emgadg43@gmail.com</a>
              <a href='#' className='links'><i className='fas fa-location-arrow'></i> kerala,india</a>
       
          </div>
          <div className='box'>
            <h3>Products</h3>
            <a href='#' >Watches</a>
              <a href='#' >Shoes</a>
              <a href='#' >Popular</a>
              <a href='#' >Gym Accessories </a>
              
          </div>
          <div className='box'>
            <h3>Quick links</h3>
              <a href='#' className='links'>home</a>
              <a href='#' className='links'>features</a>
              <a href='#' className='links'>product</a>
              <a href='#' className='links'>categories</a>
          </div>
          
          
        </div>
        <div className='line'></div>
        <div className='subs-container'>
            <div className='share'>
              <a href='#' className='fab fa-facebook-f'></a>
              <a href='#' className='fab fa-twitter'></a>
              <a href='#' className='fab fa-instagram'></a>
              <a href='#' className='fab fa-linkedin'></a>
            </div>
            <form action="" className="subs-form">
             <input type='text' id='email' placeholder='Email address'/>
             <button className='btn'>subscribe</button>
          </form>
        </div>
        <div className='credit'>Copyright © 2021 EmGadgets| all rights reserved </div>
      </section>
  
    )
}
export default Footer