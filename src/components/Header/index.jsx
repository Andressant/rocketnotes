import { RiShutDownLine} from 'react-icons/ri';
import { Container, Profile, Logout } from "./styles";

export function Header(){
  return(
    <Container>
      <Profile to="/profile">
        <img 
          src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          alt="Foto do usuário"
        />

        <div>
          <span>Bem-vindo</span>
          <strong>André Fernandes</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine/>
      </Logout>

    </Container>
  )
}