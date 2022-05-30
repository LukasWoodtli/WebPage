import React from "react";
import {ButtonGroup, IconButton} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faXing} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';


const icons = [
    {icon: faLinkedin, link: 'https://www.linkedin.com/in/lukaswoodtli'},
    {icon: faGithub, link: 'https://github.com/LukasWoodtli'},
    {icon: faXing, link: 'https://www.xing.com/profile/Lukas_Woodtli'},
    {icon: faEnvelope, link: 'mailto:woodtli.lukas@gmail.com'}
];

interface FooterProps {
    style: any;
}

function Footer(props: FooterProps) {
    return (
        <div style={props.style}>
            <ButtonGroup variant="outlined"
                         aria-label="social media links"
                         sx={{marginLeft: "auto", mr: 5}}>
                {icons.map(icon => (
                    <IconButton component="span" color="primary" key={icon.link} aria-label={icon.link}>
                        <a href={icon.link} target="_blank" rel="noreferrer" data-testid={"footer-icon"} aria-label={icon.link}>
                            <FontAwesomeIcon icon={icon.icon}/>
                        </a>
                    </IconButton>))}
            </ButtonGroup>
        </div>
    );
}

export default Footer;
