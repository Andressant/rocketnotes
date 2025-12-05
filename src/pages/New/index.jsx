import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";

const STORAGE_KEY = "@rocketnotes:notes";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddTag() {
    if (!newTag.trim()) return;

    setTags((prev) => [
      ...prev,
      { id: String(Date.now()), name: newTag.trim() },
    ]);
    setNewTag("");
  }

  function handleRemoveTag(tagId) {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  }

  function handleSaveNote() {
    if (!title.trim()) {
      alert("Digite um título para a nota.");
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const notes = stored ? JSON.parse(stored) : [];

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      tags,
    };

    const updatedNotes = [...notes, newNote];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));

    navigate("/"); // volta pra Home
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <Form>
        <header>
          <h1>Criar nota</h1>
          <Button title="Voltar" onClick={handleBack} />
        </header>

        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Observações"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Section title="Marcadores">
          <div className="tags">
            {tags.map((tag) => (
              <NoteItem
                key={tag.id}
                value={tag.name}
                onClick={() => handleRemoveTag(tag.id)}
              />
            ))}

            <NoteItem
              isNew
              placeholder="Nova tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onClick={handleAddTag}
            />
          </div>
        </Section>

        <Button title="Salvar" onClick={handleSaveNote} />
      </Form>
    </Container>
  );
}