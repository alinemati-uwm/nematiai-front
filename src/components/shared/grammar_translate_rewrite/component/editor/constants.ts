export const characterValueItems = [
  "editor_footer_total_word",
  "editor_footer_total_char",
  "editor_footer_total_sentence",
  "editor_footer_total_token",
] as const;

export const downloadDropdownItems = [
  {
    title: "editor_header_copy_text_without_style",
    Icon: "fa-regular:copy",
    type: "copy",
  },
  {
    title: "editor_header_copy_text_with_style",
    Icon: "grommet-icons:copy",
    type: "copy",
  },
  {
    title: "editor_header_copy_html",
    Icon: "fa:html5",
    type: "copy",
  },
  {
    title: "editor_header_down_pdf",
    Icon: "fa:file-pdf-o",
    type: "download",
    download: "pdf",
  },
  {
    title: "editor_header_down_word",
    Icon: "bi:filetype-docx",
    type: "download",
    download: "doc",
  },
] as const;
