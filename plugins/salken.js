let handler  = async (m, { conn, usedPrefix }) => { 
	conn.sendButton(m.chat, `𝙃𝙖𝙡𝙤👋\n𝙎𝙖𝙮𝙖 𝙖𝙙𝙖𝙡𝙖𝙝 𝘽𝙤𝙩 𝙇𝙮𝙣𝙣𝙓𝙯𝙮, 𝘽𝙤𝙩 𝙇𝙮𝙣𝙣𝙓𝙯𝙮 𝙖𝙙𝙖𝙡𝙖𝙝 𝙨𝙚𝙗𝙪𝙖𝙝 𝘽𝙤𝙩 𝙮𝙖𝙣𝙜 𝙗𝙞𝙨𝙖 𝙢𝙚𝙢𝙗𝙖𝙣𝙩𝙪 𝙙𝙖𝙣 𝙢𝙚𝙢𝙪𝙙𝙖𝙝𝙠𝙖𝙣 𝙪𝙨𝙚𝙧, 𝙆𝙡𝙞𝙠 𝙩𝙤𝙢𝙗𝙤𝙡 𝙙𝙞𝙗𝙖𝙬𝙖𝙝 𝙞𝙣𝙞 𝙟𝙞𝙠𝙖 𝙠𝙖𝙢𝙪 𝙞𝙣𝙜𝙞𝙣 𝙢𝙚𝙣𝙜𝙜𝙪𝙣𝙖𝙠𝙖𝙣 𝙗𝙤𝙩`.trim(), '©𝙇𝙮𝙣𝙣𝙓𝙯𝙮', 'Menu', '.menu', m)
	}

handler.command = /^(salken)$/i

module.exports = handler
