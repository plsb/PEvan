import {wedding} from '../config/wedding';
import {Botanical,Chapter,Fade,Photo} from './Shared';
import Countdown from './Countdown';
export const eventDate=()=>new Intl.DateTimeFormat('pt-BR',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${wedding.event.date}T12:00:00Z`));
export default function WeddingReveal(){return <section id="casamento" className="reveal"><Photo name={wedding.photos.reveal}/><div className="reveal-shade"/><div className="reveal-content"><Fade><Chapter number="03">O GRANDE MOMENTO</Chapter><h2>...e agora escolhemos<br/><em>celebrar o nosso amor.</em></h2></Fade><Fade className="reveal-names" delay={.7}><Botanical/><p className="names">{wedding.couple.person1}<span>&</span>{wedding.couple.person2}</p><p className="eyebrow">VAMOS NOS CASAR!</p><p className="wedding-date">{eventDate()}</p><Countdown/></Fade></div></section>}
