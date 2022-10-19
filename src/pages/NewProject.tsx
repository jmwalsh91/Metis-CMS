import { stackOptions } from "@/constants/stackOptions";
import {
  Button,
  Container,
  Modal,
  MultiSelect,
  TextInput,
  Text,
  Grid,
  Textarea,
  Title,
  ScrollArea,
} from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
/* import { Dropzone } from "@mantine/dropzone"; */
import { useForm, UseFormReturnType } from "@mantine/form";
import RichTextEditor from "@mantine/rte";
/* import { sanitize } from "dompurify"; */
import React, { useState } from "react";
/* import { Routes } from "react-router-dom"; */
import { FileUpload } from "../components/FileUpload";
import PreviewProjectModal from "../components/targets/PreviewProjectModal";
/* import PreviewModalContent from "../components/targets/PreviewModalContent"; */
import { Project, sb, UploadImageResponse } from "../services/sb";
/* import { sanitizeRichText } from "../utils/rte/handleText"; */


  export interface FormValues {
    project_name: string
    card_text: string
    card_image: string
    description: string
    stack_badges: string[]
    mockup: string,
    rich_text?: string,
  }

const initialValue =
  "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";


function NewProject() {
  const [value, onChange] = useState<string>(initialValue);
  const [title, setTitle] = useState<string>("Title");
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState({
    title: "title",
    postText: initialValue,
  });

  const newLocal = '<pre spellcheck="false" class="ql-syntax">';
  const newLocal2 = "</pre>";

  const form = useForm<FormValues>({
    initialValues: {
      project_name: "",
      card_text: "",
      card_image:
        "",
      description: "",
      stack_badges: [""],
      mockup:
        "https://images.unsplash.com/photo-1621237023000-6a628c285938?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
  });
  async function prismify(content: string) {
    content.replace(newLocal, "<Prism language='tsx'>");
    content.replace(newLocal2, "</Prism>");
    console.log(content);
    return content;
  }

  async function handleDrop(files: File[]) {
    const imgUrl = await sb.files
      .upload(files[0], title)
      .then((imgUrl) => form.setFieldValue("mockup", imgUrl as string))
      .catch((error) => console.log(error));

    console.log(imgUrl);
  }

  async function handleSubmitPost(form: UseFormReturnType<FormValues>) {
    console.log(form)
    const response = await sb.projects.createNewProject(form.values as unknown as Project);
    console.log(response);
  }

  async function handlePreview() {
    console.log(form.values);
    setOpen(true);
  }

  return (
      
      <Container fluid sx={{
        display: "flex",
        }}>
          <ScrollArea hidden={false}>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Project Name"
            label="Project Name"
            required
            onChange={(e) => form.setFieldValue("project_name", e.currentTarget.value)}
            {...form.getInputProps("project_name")}
            />
        </Grid.Col>

        <Grid.Col span={6}>
          <MultiSelect
            data={stackOptions}
            label="Stack"
            placeholder="What stack?"
            {...form.getInputProps("stack_badges")}
            />
        </Grid.Col>

        <Grid.Col span={6}>
          <Text size="sm" weight="600" >Project Image</Text>
          <FileUpload sx={{
        height: "200px"  
        }}
          onDrop={(files: File[]) => handleDrop(files)} />
        </Grid.Col>

        <Grid.Col span={6}>
          <Textarea
            
            sx={{
              height: "200px"  
              }}
            label="Card Description"
            labelStyle={{  }}
            minRows={8}
            {...form.getInputProps("card_text")}
            />
        </Grid.Col>
      </Grid>
      <Textarea
            size="xl"
            label="Project Description"
            minRows={10}
            mb="md"
            {...form.getInputProps("description")}
            />
          {/* <Title order={2}>Rich Text</Title>
      <RichTextEditor
        value={value}
        label="Rich Text"
        sx={{
            minHeight: "50vh",
            maxHeight: "85vh",
        }}
        onChange={onChange}
        {...form.getInputProps("rich_text")}
        />  */}
      <Button onClick={() => handlePreview()}>Preview</Button>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Preview"
        size="80%"
        >
        <PreviewProjectModal form={form}/>
        {/* TODO: Is this a good idea?
        <TextInput
            placeholder="Video URL"
            label="Video"
            
            onChange={(e) => form.setFieldValue("video_url", e.currentTarget.value)}
            {...form.getInputProps("video_url")}
            /> */}
        <Button color="accent" sx={{paddingBottom: "5rem"}} onClick={() => handleSubmitPost(form)}>Submit</Button>
      </Modal>
          </ScrollArea>
    </Container>
  );
}
export default NewProject