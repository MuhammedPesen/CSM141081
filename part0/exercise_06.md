```mermaid
    sequenceDiagram
        browser ->>server: POST exampleapp/new_note_spa
        server -->>browser: 201 Created (JSON data)

        note over browser: browser executes event handler
```