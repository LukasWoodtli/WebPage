import { Component, OnInit } from '@angular/core';
import { faLinkedin, faGithub, faStackOverflow, faXing } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-links',
  templateUrl: './contact-links.component.html',
  styleUrls: ['./contact-links.component.sass']
})
export class ContactLinksComponent implements OnInit {

  icons = [
    {icon: faLinkedin, link: 'https://www.linkedin.com/in/lukaswoodtli'},
    {icon: faGithub, link: 'https://github.com/LukasWoodtli'},
    {icon: faStackOverflow, link: 'https://stackoverflow.com/cv/lukaswoodtli'},
    {icon: faXing, link: 'https://www.xing.com/profile/Lukas_Woodtli'},
    {icon: faEnvelope, link: 'mailto:woodtli.lukas@gmail.com'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
