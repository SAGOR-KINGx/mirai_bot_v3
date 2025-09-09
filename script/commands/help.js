module.exports.config = {
  'name': "help",
  'version': "1.0.2",
  'hasPermssion': 0x0,
  'credits': "SaGor",
  'description': "help cmd show",
  'commandCategory': "system",
  'usages': "[Name module]",
  'cooldowns': 0x5,
  'envConfig': {
    'autoUnsend': false,
    'delayUnsend': 0x14
  }
};
module.exports.languages = {
  'en': {
    'moduleInfo': "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
    'helpList': "[ There are %1 commands on this bot, Use: \"%2help nameCommand\" to know how to use! ]",
    'user': "User",
    'adminGroup': "Admin group",
    'adminBot': "Admin bot"
  }
};
module.exports.handleEvent = function ({
  api: _0x3d15ea,
  event: _0x5c2ad6,
  getText: _0x5de021
}) {
  const {
    commands: _0x49fc28
  } = global.client;
  const {
    threadID: _0x229611,
    messageID: _0x5818c6,
    body: _0x44ae04
  } = _0x5c2ad6;
  if (!_0x44ae04 || typeof _0x44ae04 == "undefined" || _0x44ae04.indexOf("help") != 0) {
    return;
  }
  const _0x5c44ec = _0x44ae04.slice(_0x44ae04.indexOf("help")).trim().split(/\s+/);
  if (_0x5c44ec.length == 1 || !_0x49fc28.has(_0x5c44ec[1].toLowerCase())) {
    return;
  }
  const _0x9f1804 = global.data.threadData.get(parseInt(_0x229611)) || {};
  const _0x1ec333 = _0x49fc28.get(_0x5c44ec[1].toLowerCase());
  const _0x43ffed = _0x9f1804.hasOwnProperty("PREFIX") ? _0x9f1804.PREFIX : global.config.PREFIX;
  return _0x3d15ea.sendMessage(_0x5de021("moduleInfo", _0x1ec333.config.name, _0x1ec333.config.description, '' + _0x43ffed + _0x1ec333.config.name + " " + (_0x1ec333.config.usages ? _0x1ec333.config.usages : ''), _0x1ec333.config.commandCategory, _0x1ec333.config.cooldowns, _0x1ec333.config.hasPermssion == 0 ? _0x5de021("user") : _0x1ec333.config.hasPermssion == 1 ? _0x5de021("adminGroup") : _0x5de021("adminBot"), _0x1ec333.config.credits), _0x229611, _0x5818c6);
};
module.exports.run = function ({
  api: _0x57183c,
  event: _0x30f149,
  args: _0x1220a4,
  getText: _0x5de762
}) {
  const {
    commands: _0xc7eb3e
  } = global.client;
  const {
    threadID: _0x5d84c2,
    messageID: _0x500686
  } = _0x30f149;
  const _0x263568 = _0xc7eb3e.get((_0x1220a4[0] || '').toLowerCase());
  const _0x235a23 = global.data.threadData.get(parseInt(_0x5d84c2)) || {};
  const {
    autoUnsend: _0x5c50bc,
    delayUnsend: _0xc82e87
  } = global.configModule[this.config.name];
  const _0x4fc0c0 = _0x235a23.hasOwnProperty("PREFIX") ? _0x235a23.PREFIX : global.config.PREFIX;
  if (!_0x263568) {
    const _0x15204c = [];
    const _0x43657e = parseInt(_0x1220a4[0]) || 1;
    let _0x3f2d57 = 0;
    let _0x31c977 = "╭────────────╮\n👉🏻 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 👈🏻\n╰────────────╯\n\n";
    for (var [_0xbf4465, _0x1fb7de] of _0xc7eb3e) {
      _0xbf4465 += " 🖤 " + _0x1fb7de.config.usages;
      _0x15204c.push(_0xbf4465);
    }
    _0x15204c.sort((_0x281bba, _0x420855) => _0x281bba.data - _0x420855.data);
    const _0x493533 = 30 * _0x43657e - 30;
    _0x3f2d57 = _0x493533;
    const _0x1ad689 = _0x15204c.slice(_0x493533, _0x493533 + 30);
    for (let _0x29c0e1 of _0x1ad689) _0x31c977 += "╭─╮ \n💚" + ++_0x3f2d57 + "💚 \n╰─╯ 🥀" + _0x29c0e1 + "\n";
    const _0x31c0f9 = "╭──────╮\n✅✅ 𝐏𝐀𝐆𝐄   ✅✅\n╰──────╯ (" + _0x43657e + '/' + Math.ceil(_0x15204c.length / 30) + ")\nType: \"" + _0x4fc0c0 + "help 🥀command name🥀\" for more details about that command\n\nCurrently available " + _0x15204c.length + " command on " + global.config.BOTNAME + " Bot\n\n╭───────────╮\n🙈 𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 🙈\n╰───────────╯ \n𝗕𝗢𝗧 𝗣𝗥𝗘𝗙𝗜𝗫\n" + _0x4fc0c0 + " \n╭────────────╮\n🖤 𝗦𝗔𝗚𝗢𝗥 🖤╰────────────╯\n    \n🖤✅🥀 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝗙𝗕 𝗜𝗗🖤✅🥀\n\n[𝗔𝗡𝗬 𝗛𝗘𝗟𝗣 𝗖𝗢𝗡𝗧𝗔𝗖 𝗙𝗕]\n\n🍁🍂https://www.facebook.com/JAHIDUL ISLAM.404 🍂🍁 \n\n╭──────────╮\n🖤 𝗙𝗢𝗥 𝗛𝗔𝗧𝗘𝗥𝗦 🖤╰──────────╯ \n      𝗙𝗘𝗘𝗟 𝗧𝗛𝗘 𝗣𝗢𝗪𝗘𝗥 𝗢𝗙 𝗦𝗔𝗚𝗢𝗥";
    return _0x57183c.sendMessage(_0x31c977 + "\n" + _0x31c0f9, _0x5d84c2, async (_0x4463e8, _0x3e61b1) => {
      if (_0x5c50bc) {
        await new Promise(_0x44f972 => setTimeout(_0x44f972, _0xc82e87 * 10000));
        return _0x57183c.unsendMessage(_0x3e61b1.messageID);
      } else {
        return;
      }
    });
  }
  return _0x57183c.sendMessage(_0x5de762("moduleInfo", _0x263568.config.name, _0x263568.config.description, '' + _0x4fc0c0 + _0x263568.config.name + " " + (_0x263568.config.usages ? _0x263568.config.usages : ''), _0x263568.config.commandCategory, _0x263568.config.cooldowns, _0x263568.config.hasPermssion == 0 ? _0x5de762("user") : _0x263568.config.hasPermssion == 1 ? _0x5de762("adminGroup") : _0x5de762("adminBot"), _0x263568.config.credits), _0x5d84c2, _0x500686);
};
