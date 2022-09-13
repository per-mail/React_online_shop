import React from 'react';

function Header() {
    return (
        <nav className='green darken-1'>
            <div className='nav-wrapper'>
                <a href='/' className='brand-logo'>
                    React Online Shop
                </a>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li>
                        <a
                            href='https://github.com/michey85/react-shop'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Test
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export { Header };
