import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Links, Content } from "./styles";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";

const STORAGE_KEY = "@rocketnotes:notes";

export function Details() {
  const [note, setNote] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const notes = stored ? JSON.parse(stored) : [];

    const foundNote = notes.find(
      (noteItem) => String(noteItem.id) === String(params.id)
    );

    if (!foundNote) {
      alert("Nota não encontrada.");
      navigate("/");
      return;
    }

    setNote(foundNote);
  }, [params.id, navigate]);

  function handleDelete() {
    const confirmDelete = confirm("Deseja realmente excluir essa nota?");

    if (!confirmDelete) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    const notes = stored ? JSON.parse(stored) : [];

    const filtered = notes.filter(
      (noteItem) => String(noteItem.id) !== String(params.id)
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    navigate("/");
  }

  function handleBack() {
    navigate(-1);
  }

  if (!note) {
    return (
      <Container>
        <Header />
        <main>
          <Content>
            <p>Carregando...</p>
          </Content>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir nota" onClick={handleDelete} />

          <h1>{note.title}</h1>

          {note.description && <p>{note.description}</p>}

          {/* Se quiser manter a seção de links no futuro, pode ligar aqui
          <Section title="Links úteis">
            <Links>
              <li>
                <a href="#">https://www.rocketseat.com.br</a>
              </li>
            </Links>
          </Section>
          */}

          {note.tags && note.tags.length > 0 && (
            <Section title="Marcadores">
              {note.tags.map((tag) => (
                <Tag key={tag.id} title={tag.name} />
              ))}
            </Section>
          )}

          <Button title="Voltar" onClick={handleBack} />
        </Content>
      </main>
    </Container>
  );
}