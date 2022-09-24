export interface RichEditorProps {
  html: string
  className?: string
}

export const RichEditor: React.FC<RichEditorProps> = (props) => {
  const { html, className } = props

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      className={`richeditor ${className}`}
    />
  )
}
