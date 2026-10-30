exports.default = {
   tags: 'owner',
   help: ['upsw', 'upstatus', 'tagsw'],
   command: ['upsw', 'upstatus', 'tagsw'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!m.quoted) return m.reply('balas pesan yang mau dijadikan status !')
      if (!m.quoted.full()) return m.reply('Data pesan tidak ditemukan!')
      if (/tagsw/.test(command)) {
         if (!m.isGroup) throw mess.group
         const adminList = m.participants.filter(v => v.isAdmin)
         const owner = setting.owner.map(v => v + '@s.whatsapp.net')
         const me = [conn.decodeJid(conn.getCredentials().meLid)]
         const except = adminList.map(v => v.jid)
         const added = adminList
            .filter(v => owner.includes(v.phoneNumber))
            .map(v => db.users[v.phoneNumber]?.lid || v.jid)
         const participants = m.participants
            .filter(v => !except.includes(v.jid))
            .map(v => v.jid)
         const recipients = [...participants, ...added, ...me]
         if (/text/.test(m.quoted.mtype)) {
            m.react('🕒')
            await conn.status.send({
               content: m.quoted.text,
               recipients: recipients
            })
            m.react('✅')
         } else {
            const path = await conn.getFile(m.quoted.content)
            const type = m.quoted.mtype.split('/')[0]
            if (type === 'video') {
               var vid = await Utils.chunks(path)
            }
            m.react('🕒')
            if (type !== 'video') {
               await conn.status.send({
                  content: {
                     type: type,
                     caption: m.quoted.text,
                     media: path,
                     mimetype: m.quoted.mtype
                  },
                  recipients: recipients//m.participantsMentionedLid.concat(Object.values(db.users).map(v =>  v.lid))
               })
               m.react('✅')
            } else {
               for await (let v of vid) {
                  await conn.status.send({
                     content: {
                        type: type,
                        caption: m.quoted.text,
                        media: v,
                        mimetype: m.quoted.mtype
                     },
                     recipients: recipients//m.participantsMentionedLid.concat(Object.values(db.users).map(v =>  v.lid))
                  })
                  m.react('✅')
               }
            }
         }
      } else {
         if (/text/.test(m.quoted.mtype)) {
            m.react('🕒')
            await conn.status.send({
               content: m.quoted.text,
               recipients: Object.values(db.users).map(v => v.lid)
            })
            m.react('✅')
         } else {
            const path = await conn.getFile(m.quoted.content)
            const type = m.quoted.mtype.split('/')[0]
            if (type === 'video') {
               var vid = await Utils.chunks(path)
            }
            m.react('🕒')
            if (type !== 'video') {
               await conn.status.send({
                  content: {
                     type: type,
                     caption: m.quoted.text,
                     media: path,
                     mimetype: m.quoted.mtype
                  },
                  recipients: Object.values(db.users).map(v => v.lid)
               })
               m.react('✅')
            } else {
               for await (let v of vid) {
                  await conn.status.send({
                     content: {
                        type: type,
                        caption: m.quoted.text,
                        media: v,
                        mimetype: m.quoted.mtype
                     },
                     recipients: Object.values(db.users).map(v => v.lid)
                  })
                  m.react('✅')
               }
            }
         }
      }
   },
   owner: true
}