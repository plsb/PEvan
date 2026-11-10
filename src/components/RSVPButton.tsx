import {MessageCircle} from 'lucide-react';
import {wedding} from '../config/wedding';
import {whatsappUrl} from '../lib/event';
export default function RSVPButton(){const url=whatsappUrl(wedding.rsvp.whatsappNumber,wedding.rsvp.message);return url?<a className="button" href={url} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Confirmar minha presença</a>:<p className="pending-note">Em breve, a confirmação de presença estará disponível por aqui.</p>}
