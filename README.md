# BotBase
Bot Base Discord--- 

Dentro del src debe crear una carpeta llamada commands la cual colocará todos sus comandos 

la estructura del comando base es

```js
module.exports = {
  name: "",
  description: "",
  aliases: [],
  usage: "",
  userpermissions: [],
  botpermissions: [],
  guildOnly: true,
  args: true,
  cooldown: 0,
  category: [],
  devOnly: false,
  async execute(client, message, args) {
  
   }
  }
  ```
