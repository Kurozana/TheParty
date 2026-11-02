// ---------- The guests. Edit names, lines and files here. ----------
// A scene is a list of steps:
//   { rem: 'words', voice: 'file' }  a hero says something (voice = assets/audio/<hero>/<file>.mp3, plays by itself)
//   { alex: 'words', thought: true } Alex says (or thinks) something
//   { choose: [{ alex: 'answer', then: [steps] }, ...] }  Alex picks an answer; "then" plays only after that answer
//   { wait: 8 }       a quiet pause of 8 seconds
//   { untilSong: 30 } hold here until the song playing now has played 30 seconds, so the story doesn't rush
//   { game: 'cubes' } a minigame plays here; the talk goes on once it's over ('cubes', 'tunnels', 'fight')
//   { narrate: 'words' } story text in the chat with no speaker (a crowd, an announcer…); waits for a click
//   { dark: { sound, text } } Drifter's ultimate: the screen goes black while sfx/<sound>.mp3 plays, then red eyes
//   { steal: true }   Billy rips Rem's ticket piece out of the holder
//   { give: 'title' } hand over the next ticket piece right here, with that title
//   { assemble: true } the whole ticket lights up, piece by piece
//   { asleep: true }  Rem falls asleep (the very end)
//   { appear: true }  the guest's card drops in now (for a guest with appearsLater: the talk starts before we see them)
const CAST = [
  {
    id: 'rem',
    name: 'Rem',
    desc: 'New York\'s little helper', // on the ticket stub at the card's corner
    img: 'assets/img/rem.webp',
    bg: '#1d2440',
    sleepImg: 'assets/img/rem-asleep.png', // eyes closed with z's until woken
    head: 'assets/img/rem-head.png',       // his face in the conversation
    art: 'assets/img/rem-bg.webp',         // his hero-select art behind his words
    nameImg: 'assets/img/rem-name.webp',   // his name logo
    // the front page that spins in before this guest appears
    headline: 'Sleepy local found lost, searching all night for a party',
    caption: 'Last seen in striped pyjamas, holding a pillow.',
    story: 'Whispers are spreading through the Cursed Apple of a secret party so big that half the city has been invited, yet nobody seems to know where it is. One drowsy resident has been seen wandering every lane since sundown, pillow in hand, asking strangers for directions. "I heard there\'d be music. And snacks," he told this paper, before dozing off against a lamppost. Visitors arriving tonight are advised to keep their eyes open and follow the music.',
    // the walk after the paper, written out line by line
    walk: [
      'You fold up the paper and wander deeper into the Cursed Apple.',
      'Neon hums. A saxophone plays to nobody. This city never sleeps…',
      '…but someone in the corner, by the old lamppost, definitely is.',
    ],
    asleepMusic: 'sleeping', // Rem's Hideout theme plays while he sleeps
    // what Alex thinks when he spots him, before waking him (he can't be woken until the song has played a while)
    found: [
      { alex: 'Striped pyjamas… a pillow… wait. That\'s the kid from the newspaper!', thought: true },
      { wait: 5 },
      { alex: 'He looks so peaceful. It feels wrong to wake him up…', thought: true },
      { untilSong: 15 },
    ],
    wakeHint: 'Click him to wake him up',
    talk: [
      { rem: '*yawning squawk*', voice: 'yawning-squawk' },
      { rem: 'I\'m not ready to sleep, I\'m awake.', voice: 'im-awake' },
      { rem: 'You\'re big.', voice: 'youre-big' },
      { rem: 'My name\'s Rem.', voice: 'my-names-rem' },
      { choose: [
        { alex: 'Hey, are you okay? You were asleep on the street.', then: [
          { rem: 'I\'m lost. Can you help?', voice: 'lost-can-you-help' },
        ] },
        { alex: 'You\'re the kid from the newspaper!', then: [
          { rem: 'I\'m in the newspaper?' },
          { rem: 'Cool!', voice: 'cool' },
        ] },
        { alex: 'Did you just fall asleep standing up?', then: [
          { rem: 'Being awake is hard.', voice: 'awake-is-hard' },
        ] },
      ] },
      { rem: 'Do you know where the party is?' },
      { alex: 'Party? What party?' },
      { alex: 'Wait… I think I read something about a party in the newspaper.', thought: true },
      { rem: 'I\'ve been looking for it all night! It\'s really, really big.' },
      { rem: 'But nobody will tell me where it is.' },
      { choose: [
        { alex: 'Okay. I\'ll help you find it.', then: [
          { rem: 'Really?', voice: 'really' },
        ] },
        { alex: 'A big party? Are you sure?', then: [
          { rem: 'Uh-huh! The biggest! Everybody keeps whispering about it.' },
          { alex: '…Okay. I\'ll help you find it.' },
          { rem: 'Really?', voice: 'really' },
        ] },
      ] },
      { rem: 'Nobody ever helps me. They just tell me to go home.' },
      { rem: 'Can I follow you?', voice: 'can-i-follow-you' },
      { choose: [
        { alex: 'Of course you can.', then: [
          { rem: 'Yay!', voice: 'yay' },
        ] },
        { alex: 'Only if you stay awake.', then: [
          { rem: 'I\'ll try. No promises.' },
          { rem: '*yawn*', voice: 'yawn' },
        ] },
      ] },
      { rem: 'Oh! Wait!' },
      { rem: 'I found something!', voice: 'found-something' },
      { rem: 'It has fancy writing on it, and I can\'t read fancy writing.' },
      { alex: 'It\'s… a piece of a ticket? It\'s torn. All it says is "ADMIT"…' },
      { choose: [
        { alex: 'Where did you get this?' },
        { alex: 'Rem… did you steal this?', then: [
          { rem: 'No! …I don\'t think so.' },
        ] },
      ] },
      { rem: 'I was napping right here. When I woke up, it was under my pillow.' },
      { rem: 'And a mysterious man was walking away.' },
      { alex: 'A mysterious man? What did he look like?' },
      { rem: 'He looked fancy.' },
      { rem: 'And he smelled like soap.' },
      { alex: 'A fancy man who smells like soap… who leaves half a ticket under a sleeping kid\'s pillow?', thought: true },
      { rem: 'Maybe somebody has the other pieces!' },
      { rem: 'We friends?', voice: 'we-friends' },
      { choose: [
        { alex: 'Of course we are.', then: [
          { rem: 'Friends forever!', voice: 'friends-forever' },
        ] },
        { alex: 'Nap buddies.', then: [
          { rem: 'Ya, nap buddies!', voice: 'nap-buddies' },
        ] },
      ] },
    ],
    clue: 'Looked fancy. Smelled like soap.', // listed when Alex has to guess who the mysterious man is
    givesPiece: true, // hands Alex the next torn ticket piece when the talk ends
    objective: ['Collect all the torn ticket pieces.', 'Find out who the mysterious man is.'],
  },
  {
    id: 'vyper',
    name: 'Vyper',
    desc: 'Girl failure',
    img: 'assets/img/vyper.png',
    bg: 'radial-gradient(120% 90% at 50% 20%, #b8641c, #5a2508)',
    head: 'assets/img/vyper-head.png',
    art: 'assets/img/vyper-bg.webp',
    nameImg: 'assets/img/vyper-name.webp',
    clue: 'Tipped her. Nobody tips V.',
    walk: [
      'You wander the Cursed Apple with Rem dragging his pillow behind you.',
      'Then he stops dead in front of an ice cream cart and won\'t move.',
      'While you order, you glance back…',
      '…and a woman with a knife is crouched right next to Rem.',
    ],
    talk: [
      { vyper: 'Hey kid, you ready to be an accessory?', voice: 'accessory' },
      { rem: 'What\'s that?', voice: 'whats-that' },
      { vyper: 'Yeah you are.', voice: 'yeah-you-are' },
      { vyper: '2 cigarettes for the pillow.', voice: 'two-cigarettes' },
      { rem: 'If I get rid of my pillow I can\'t take a nap.', voice: 'cant-take-a-nap' },
      { vyper: 'You\'re in New York, baby. Who needs sleep?', voice: 'who-needs-sleep' },
      { rem: 'You don\'t get me.', voice: 'you-dont-get-me' },
      { alex: 'Okay, that\'s enough.', thought: true },
      { choose: [
        { alex: 'Hey! Get away from him.', then: [
          { vyper: 'Relax, buddy. We\'re just doin\' a little business.' },
        ] },
        { alex: 'Is that… a knife?', then: [
          { vyper: 'Just making sure, \'cause I got two hands, a knife and real bad impulse control. So whaddya need?', voice: 'knife' },
        ] },
      ] },
      { vyper: 'Name\'s Vyper. V to my friends. You ain\'t my friend yet.' },
      { rem: 'She wants my pillow.' },
      { alex: 'Nobody\'s taking your pillow, Rem.' },
      { vyper: 'You\'re no fun.', voice: 'no-fun' },
      { choose: [
        { alex: 'Have you seen a torn ticket? Gold, with fancy writing?' },
        { alex: 'We\'re looking for a party. Know anything?', then: [
          { vyper: 'A party? Buddy, I always know about a party.' },
          { vyper: '…But this one, nah. Nobody\'s talkin\'.' },
          { alex: 'There\'s a torn ticket. Gold, with fancy writing.' },
        ] },
      ] },
      { vyper: 'Ohhh. You mean this?' },
      { alex: 'That\'s it! Where did you get that?' },
      { vyper: 'Some fancy fella handed it to me this mornin\'. Tipped me too.' },
      { vyper: 'Nobody tips V.' },
      { alex: 'Fancy again…', thought: true },
      { alex: 'Can we have it?' },
      { vyper: 'Nothin\' in this city\'s free, buddy. Whatcha got for V?' },
      { choose: [
        { alex: 'Ice cream?', then: [
          { vyper: '…Is that pistachio?' },
          { alex: 'Strawberry.' },
          { vyper: 'Deal.', voice: 'deal' },
        ] },
        { alex: 'We don\'t have any money.', then: [
          { vyper: 'Lame.', voice: 'lame' },
          { alex: '…I have ice cream.' },
          { vyper: 'Deal.', voice: 'deal' },
        ] },
      ] },
      { rem: 'That was my ice cream…' },
      { alex: 'I\'ll buy you another one, Rem.' },
      { rem: 'Yay!', voice: 'yay' },
      { vyper: 'You guys look like you know how to party, am I right?', voice: 'know-how-to-party' },
      { vyper: 'If you find it, save V a seat.' },
    ],
    givesPiece: true,
  },

  // ---------- The city map: Alex picks who to find next. district = where their "?" card sits ----------
  // (scenes not written yet play a one-line stand-in so the map can be tested)
  {
    id: 'drifter', name: 'Drifter', district: 'downtown', desc: 'Whistling sounds', bg: tone('#8a1c1c', '#2e0606'), ...look('drifter'),
    clue: 'Polite. Too polite.',
    appearsLater: true, // nothing but darkness and whistling at first
    walk: [
      'Downtown. Rem knows a shortcut… through a dark alley.',
      'It\'s quiet. Too quiet.',
      'The streetlights flicker… then go out, one by one.',
      'Rem grabs your sleeve.',
    ],
    talk: [
      { dark: { sound: 'drifter-whistle', text: 'Somewhere in the dark… someone is whistling.' } },
      { narrate: 'The whistling stops. Right behind you.' },
      { appear: true },
      { rem: 'His whistling scares me.', voice: 'whistling-scares' },
      { drifter: 'Y\'all came a long way to die, friends…', voice: 'came-to-die' },
      { choose: [
        { alex: 'Who are you?', then: [
          { drifter: 'Just a fella who enjoys the night air.' },
        ] },
        { alex: 'We\'re just passing through!', then: [
          { drifter: 'That\'s what they all say.' },
        ] },
        { alex: 'Rem. Run.', then: [
          { rem: 'My legs are sleepy.' },
          { drifter: 'Relax, friend. I already ate.' },
        ] },
      ] },
      { rem: 'You smell like blood.', voice: 'smell-blood' },
      { alex: 'He does. He really, really does.', thought: true },
      { drifter: 'A musician\'s gotta warm up before they perform.', voice: 'warm-up' },
      { alex: '…You\'re a musician?' },
      { drifter: 'Whistlin\', mostly. Folks love my one song.' },
      { drifter: 'They\'re gonna hear me whistle, then they\'re gonna die.', voice: 'hear-me-whistle' },
      { choose: [
        { alex: 'That\'s horrifying.', then: [
          { drifter: 'Thank you.' },
        ] },
        { alex: 'Can you whistle something happy?', then: [
          { drifter: 'I only know the one song, friend.' },
          { drifter: 'It\'s happy for me.' },
        ] },
      ] },
      { rem: 'I bet your dreams are scary.', voice: 'scary-dreams' },
      { drifter: 'Not particularly. I sleep like a baby.', voice: 'sleep-like-baby' },
      { rem: 'Me too!' },
      // the friendly chat is over: he's hungry, and they're dinner
      { drifter: 'Now. Enough small talk, friends.' },
      { drifter: 'I hunger.', voice: 'i-hunger' },
      { alex: '…You what?' },
      { drifter: 'Two warm little snacks, walkin\' alone through my alley. Ain\'t that a treat.' },
      { rem: 'I\'m scared!', voice: 'im-scared' },
      { choose: [
        { alex: 'Please don\'t eat us!', then: [
          { drifter: 'Not your day, friend.', voice: 'not-your-day' },
        ] },
        { alex: 'You can\'t just eat people!', then: [
          { drifter: 'Says who?' },
          { alex: 'Says everyone! It\'s wrong!' },
          { drifter: 'Wrong for you, maybe. Not for me.' },
        ] },
        { alex: 'Eat me first. Leave the kid alone.', then: [
          { rem: 'Don\'t hurt my friends.', voice: 'dont-hurt-friends' },
          { drifter: 'How noble. You\'ll taste even better.' },
        ] },
      ] },
      { drifter: 'I want their blood.', voice: 'want-blood' },
      { alex: 'He\'s talking to himself now. That\'s worse.', thought: true },
      { drifter: 'No time to play with my food.', voice: 'play-with-food' },
      { alex: 'Think, Alex. Buy some time.', thought: true },
      { alex: 'Wait! If you eat us now… you\'ll miss the party!' },
      { drifter: '…Party?' },
      { choose: [
        { alex: 'A huge party. Tonight. Full of people.' },
        { alex: 'A fancy party. Lots and lots of… humans.' },
      ] },
      { rem: 'But Alex, you said we—' },
      { alex: 'SHH, Rem.' },
      { drifter: 'Go on…' },
      { alex: 'You need a ticket to get in. It got torn into pieces, all over the city.' },
      { alex: 'Wait… what\'s that in your coat pocket? Something gold.', thought: true },
      { drifter: 'Lookin\' for this, friend?' },
      { choose: [
        { alex: 'That\'s ours! …Kind of.' },
        { alex: 'Where did you get that?' },
      ] },
      { drifter: 'Fancy fella walked right up to me in the dark. Didn\'t run. Didn\'t scream.' },
      { drifter: 'Wished me a pleasant evening and handed me this.' },
      { drifter: 'Polite. Too polite. I don\'t trust polite, friend.' },
      { alex: 'Fancy… and now too polite. Who IS this guy?', thought: true },
      // the deal: let them live + give the piece, and they take him to the party
      { alex: 'Okay. Here\'s the deal.' },
      { alex: 'You let us live. You give us that piece…' },
      { alex: '…and we take you to the party.' },
      { drifter: 'A party, you say? Well now…' },
      { drifter: 'You make a compelling argument.', voice: 'compelling' },
      { drifter: 'Let\'s get this show on the road. I\'m feeling peckish.', voice: 'feeling-peckish' },
      { alex: 'Oh no. What did I just do.', thought: true },
      { drifter: 'Oh, there\'ll be plenty to eat, friend. A whole room of fancy folks, all dressed up… nice and warm.' },
      { choose: [
        { alex: 'No. No eating the guests.' },
        { alex: 'There will be cake. Only cake.' },
      ] },
      { drifter: 'It\'s a lot less fun for me.', voice: 'less-fun' },
      { drifter: '…Fine. I\'ll behave. Mostly.' },
      { rem: 'Can I follow you?', voice: 'can-i-follow-you' },
      { drifter: 'You\'re not going to whine about morality, are you?', voice: 'morality' },
      { rem: 'What\'s morality?', voice: 'morality' },
      { alex: 'No. Absolutely not. Rem, you\'re with me.' },
      { drifter: 'Stick with me kid, I\'ll teach you all sorts of things.', voice: 'stick-with-me' },
      { alex: 'REM.' },
      { rem: 'I\'m not scared, you\'re scared.', voice: 'not-scared' },
      { drifter: 'Here. Take it before I change my mind.' },
      { alex: '…Thank you?' },
      { drifter: 'You\'re welcome.', voice: 'youre-welcome' },
      { drifter: 'A deal\'s a deal, friends. I\'ll be listenin\' for that party.' },
      { drifter: 'Now if you\'ll excuse me… I have my own plans tonight.', voice: 'own-plans' },
      { drifter: 'Feeding time…', voice: 'feeding-time' },
      { alex: '…I hope he means a sandwich.', thought: true },
      { alex: 'Also. We are NOT taking him to the party.', thought: true },
    ],
    givesPiece: true,
  },
  {
    id: 'graves', name: 'Graves', district: 'downtown', desc: 'The angsty teenager', bg: tone('#7f8f14', '#2c3306'), ...look('graves'),
    clue: 'Even the dead are scared of him.',
    walk: [
      'Downtown, past the old cemetery gates.',
      'Rem says the graveyard is a shortcut. Rem does not know where you are going.',
      'Something glows green between the headstones…',
      '…and a girl in a school jacket is sitting on a grave, talking to nobody.',
    ],
    talk: [
      { graves: 'No. I\'m not going to the dance. Stop asking.' },
      { graves: 'The dead have been making a whole lot of demands lately.', voice: 'demands' },
      { alex: 'Who is she talking to?', thought: true },
      { rem: 'Dead things are scary.', voice: 'dead-scary' },
      { graves: 'The dead aren\'t monsters.', voice: 'not-monsters' },
      { choose: [
        { alex: 'What are they, then?', then: [
          { graves: 'Lonely.', voice: 'lonely' },
        ] },
        { alex: 'Sorry. We didn\'t mean to interrupt.', then: [
          { graves: 'It\'s fine. He wasn\'t saying anything interesting.' },
          { graves: 'He\'s dead. He never does.' },
        ] },
      ] },
      { rem: 'That hand is creepy.', voice: 'hand-creepy' },
      { graves: 'She can hear you, you know.' },
      { graves: 'Are you nervous?', voice: 'nervous' },
      { rem: 'A little.', voice: 'a-little' },
      { graves: 'Well, stick with me. I\'ll take care of you.', voice: 'take-care' },
      { alex: 'Huh. She\'s actually… kind of sweet?', thought: true },
      { rem: 'Do dead people dream?', voice: 'dead-dream' },
      { graves: 'I think so.', voice: 'think-so' },
      { rem: 'Why can\'t I talk to them?', voice: 'why-cant-talk' },
      { graves: 'You gotta listen.', voice: 'listen' },
      { rem: 'But if I\'m listening I can\'t ask \'em questions like what\'s your favorite color, and why does bread taste good, and do you think cats would smoke if they had thumbs?', voice: 'bread' },
      { graves: 'Life\'s hard sometimes.', voice: 'life-hard' },
      { rem: 'It is.', voice: 'it-is' },
      { alex: 'I have so many questions about the cats.', thought: true },
      { choose: [
        { alex: 'We\'re looking for torn pieces of a gold ticket. Seen one?' },
        { alex: 'Can your dead friends help us find something?', then: [
          { graves: 'Depends. What is it?' },
          { alex: 'A torn piece of a gold ticket.' },
        ] },
      ] },
      { graves: '…This?' },
      { graves: 'The dead were passing it around all night. Like a hot potato.' },
      { alex: 'Where did they get it?' },
      { graves: 'A man left it on a grave. Fancy suit. Didn\'t say a word.' },
      { graves: 'The dead won\'t talk about him. They\'re… scared.' },
      { alex: 'The DEAD are scared of him?' },
      { graves: 'The dead are stirring in Midtown.', voice: 'midtown' },
      { graves: 'Whatever. It\'s none of my business.' },
      { alex: 'It\'s a ticket to a party. Wanna come?' },
      { graves: 'Can\'t, my parents are dragging me to some lame party for their law firm.', voice: 'lame-party' },
      { choose: [
        { alex: 'This one\'s cooler. There\'s cake.', then: [
          { graves: '…What kind of cake.' },
          { alex: 'The good kind.' },
          { graves: 'Ugh. Fine. Maybe.' },
        ] },
        { alex: 'Rem will be there.', then: [
          { rem: 'I\'ll be there!' },
          { graves: '…Okay, that\'s actually a point.' },
        ] },
      ] },
      { rem: 'Do you like bowling?', voice: 'bowling' },
      { graves: 'What.', voice: 'what' },
      { rem: 'You look like someone who likes bowling.', voice: 'look-bowling' },
      { graves: 'It\'s kind of cool.', voice: 'kind-of-cool' },
      { rem: 'Yeah it is.', voice: 'yeah-it-is' },
      { graves: 'Here. Take it. The dead want it gone anyway.' },
      { graves: 'And don\'t tell anyone I was nice.' },
    ],
    givesPiece: true,
  },
  {
    id: 'mokrill', name: 'Mo & Krill', district: 'downtown', desc: 'Two friends, one tunnel', bg: tone('#2f6b62', '#0f2925'), ...look('mokrill'),
    clue: 'Stepped out of a door that wasn\'t there.',
    walk: [
      'Downtown. In the middle of the street, a manhole cover lifts up… all by itself.',
      'Two little eyes peek out of the dark.',
      'Then a big, furry, very sniffy nose.',
    ],
    talk: [
      { mokrill: 'I am Krill, this is Maurice - please don\'t confuse us, it\'s fairly rude.', voice: 'at-your-service' },
      { rem: 'Hi Krill!', voice: 'hi-krill' },
      { choose: [
        { alex: 'Is that… a giant mole?', then: [
          { mokrill: 'Oh, you don\'t need to worry about Maurice, he\'s a teddy bear. Well, mole. Teddy mole. No, that doesn\'t work either. I\'m just going to assume you can understand nuance.', voice: 'teddy-mole' },
        ] },
        { alex: 'Nice to meet you both!', then: [
          { mokrill: 'Don\'t mind Maurice, he\'s not chatty around new people.', voice: 'not-chatty' },
        ] },
      ] },
      { rem: 'You\'re a nice mole, Mo.', voice: 'nice-mole' },
      { rem: 'I hug you.', voice: 'i-hug-you' },
      { alex: 'Rem is hugging a giant mole. This is my life now.', thought: true },
      { alex: 'We\'re looking for torn pieces of a gold ticket. Have you seen one?' },
      { mokrill: 'Gold, you say? Funny… Maurice smelled something shiny down in the tunnels this morning.' },
      { mokrill: 'Right after a fancy fella stepped out of a door down there.' },
      { alex: 'A door. Underground.' },
      { mokrill: 'There was no door there before, my friend. And no door after, either.' },
      { alex: 'Okay, that\'s officially creepy.', thought: true },
      { mokrill: 'So you need a couple Tunnel Rats, eh?', voice: 'tunnel-rats' },
      { mokrill: 'The tunnels split three ways at every turn. Maurice will sniff. You choose.' },
      { choose: [
        { alex: 'Let\'s go!' },
        { alex: 'Are the tunnels… clean?', then: [
          { mokrill: 'No.' },
          { alex: '…Let\'s go.' },
        ] },
      ] },
      { game: 'tunnels' },
      { mokrill: 'Who left this laying here?', voice: 'who-left-this' },
      { alex: 'The ticket! Right where the door would have been.' },
      { mokrill: 'It\'s yours, friend. Maurice doesn\'t do paperwork.' },
      { rem: 'You\'re a nice not-mole, Krill.', voice: 'nice-not-mole' },
      { mokrill: 'No need to get sassy, my friend.', voice: 'no-sassy' },
      { mokrill: 'Stay safe, friend…', voice: 'stay-safe' },
    ],
    givesPiece: true,
  },
  // Billy's mad he isn't invited: he steals Rem's piece (ADMIT) whenever Alex meets him, then wins the fight; Lash wins it back
  {
    id: 'billy', name: 'Billy', district: 'uptown', desc: 'Rock \'n\' roll menace', bg: tone('#b0306a', '#3d0a22'), ...look('billy'),
    walk: [
      'Uptown. Loud guitar blasts out of a basement club.',
      'The door bangs open and a punk with goat horns stomps out.',
      'He stops. He\'s staring at your torn ticket pieces.',
    ],
    talk: [
      { billy: 'The hell you staring at, buddy?', voice: 'staring' },
      { choose: [
        { alex: 'Nothing! Nice… horns.', then: [
          { billy: 'Hey. Hey. Hey. Hey. Hey. Your taste in music sucks.', voice: 'taste' },
          { alex: 'I didn\'t even say anything about music.' },
        ] },
        { alex: 'You\'re the one staring at US.', then: [
          { billy: 'Yeah? So what.' },
        ] },
      ] },
      { billy: 'Heard there\'s some big fancy party tonight. Real exclusive.' },
      { billy: 'Everybody\'s invited. Everybody except Billy.' },
      { rem: 'I have big feelings too, Billy.', voice: 'big-feelings' },
      { billy: 'Shut it, pillow kid.' },
      { billy: 'Those gold scraps you got. That\'s the invite, ain\'t it?' },
      { choose: [
        { alex: 'Don\'t even think about it.' },
        { alex: 'Maybe you weren\'t invited because you\'re like this.' },
      ] },
      { billy: 'Too late, pal.' },
      { steal: true },
      { rem: 'Hey! That was mine! I found it!' },
      { rem: 'You won\'t bully me.', voice: 'bully' },
      { billy: 'Come on out and play, pal.', voice: 'come-play' },
      { game: 'fight' },
      { billy: 'Sorry kid, life\'s tough.', voice: 'life-tough' },
      { billy: 'Keep dreamin\', Rem.', voice: 'dreamin' },
      { billy: 'Party time!', voice: 'party-time' },
      { alex: 'Ow. Everything hurts. He\'s gone… and so is Rem\'s piece.', thought: true },
      { rem: 'I probably shouldn\'t hang out with Billy until I\'m older.', voice: 'older' },
      { choose: [
        { alex: 'We need someone who can actually fight.' },
        { alex: 'Rem, do you know anyone big and scary?' },
      ] },
      { rem: 'I know a guy! He fights in the Bear Pit.' },
      { rem: 'He has a really big mustache.' },
    ],
  },
  {
    id: 'lash', name: 'Lash', district: 'uptown', desc: 'Asshole.', bg: tone('#d9674a', '#6e2618'), ...look('lash'),
    after: 'billy', returns: true, givesPiece: true, // only after Billy's fight; gives Rem's piece back, then his own
    clue: 'Called him "sir". He liked it.',
    walk: [
      'Rem drags you uptown, under the bridge, to the Bear Pit.',
      'There\'s a fight tonight. You squeeze into the crowd to watch.',
      'Down in the pit: a huge man with a magnificent mustache…',
      '…against a guy twice his size.',
    ],
    talk: [
      // the fight Alex and Rem came to watch
      { narrate: 'The crowd chants: "LASH! LASH! LASH!"' },
      { lash: 'You guys are about to bear witness to god\'s gift to combat.', voice: 'gods-gift' },
      { lash: 'You wanna piece of The Lash?!', voice: 'piece-of-lash' },
      { alex: 'He just jumped… really, really high.', thought: true },
      { alex: 'And came down on that guy like a falling piano.', thought: true },
      { lash: 'God, it feels good when I do that.', voice: 'feels-good' },
      { rem: 'The big guy is taking a nap now.' },
      { narrate: 'The announcer grabs the microphone: "AAAND YOUR WINNER, STILL UNDEFEATED… THE LAAASH!"' },
      { narrate: 'The crowd goes wild.' },
      { lash: 'Don\'t be hard on yourself, everyone loses to The Lash.', voice: 'everyone-loses' },
      { lash: 'Perfect cardio. Perfect form. Perfect hair.', voice: 'perfect-hair' },
      { rem: 'I want his mustache.', voice: 'mustache' },
      // the fight is over: they go down to talk to him
      { alex: 'The fight\'s over. Now\'s our chance.', thought: true },
      { narrate: 'You push through the crowd, all the way down to the pit.' },
      { choose: [
        { alex: 'Are you Lash?', then: [
          { lash: 'THE Lash. Champion of the Bear Pit. You can stop clapping.' },
          { alex: 'Nobody was clapping.' },
        ] },
        { alex: 'That was amazing!', then: [
          { lash: 'I know.' },
        ] },
      ] },
      { alex: 'We need your help. A punk named Billy stole a piece of our ticket.' },
      { alex: 'We tried to fight him. It… did not go well.' },
      { lash: 'Billy? The goat with the guitar?' },
      { rem: 'He was mean. And he said your fights are rigged.' },
      { lash: '…He said WHAT.' },
      { choose: [
        { alex: 'He also said you should build up a personality.', then: [
          { lash: 'That goat is dead. That goat is so dead.' },
        ] },
        { alex: 'I\'m sure he didn\'t mean it.', then: [
          { lash: 'Oh, he meant it.' },
        ] },
      ] },
      { lash: 'And why should The Lash care about some ticket?' },
      { rem: 'It\'s for a big party. Going there is my dream.' },
      { lash: 'Your dream, huh?' },
      { lash: 'Well, lucky for you, kid.' },
      { lash: 'That\'s what The Lash does. Make dreams come true.', voice: 'dreams' },
      { lash: 'Everyone can relax, The Lash has arrived.', voice: 'has-arrived' },
      { lash: 'Here\'s the plan. You two are the bait. I\'m the hero.' },
      { alex: 'Why are we the bait?' },
      { lash: 'Because I\'m the hero.' },
      { lash: 'That goat hangs out in the alley behind his little rock club. Every night. Like clockwork.' },
      { lash: 'Well, let\'s go ruin their lives.', voice: 'ruin-lives' },
      // the walk to Billy's alley
      { narrate: 'Lash leads the way through the backstreets of Uptown, waving at people who did not wave first.' },
      { lash: 'So you want your autograph now, or after we win?', voice: 'autograph' },
      { choose: [
        { alex: 'Once we get our ticket back, we\'ll talk.' },
        { alex: 'Maybe later?' },
      ] },
      { lash: 'Ah, so you\'re one of the shy ones. You don\'t have to be afraid to ask. Who should I make it out to?', voice: 'shy-ones' },
      { alex: '…Alex.' },
      { lash: 'The Lash is too busy winning to learn names of everyone in his fan club.', voice: 'fan-club' },
      { alex: 'You literally just asked me.' },
      { rem: 'Can you sign my pillow?' },
      { lash: 'Kid, The Lash signs everything.' },
      { rem: 'Yay!', voice: 'yay' },
      { narrate: 'The alley behind the club. Empty bottles, a busted amp… and very loud guitar coming through the wall.' },
      { lash: 'This is the spot. Bait, do your thing. I\'ll be… around.' },
      { lash: 'Can\'t keep my adoring fans waiting.', voice: 'fans' },
      { game: 'trap' },
      { alex: 'Holy shit… you\'re strong.' },
      { lash: 'Obviously.', voice: 'obviously' },
      { lash: 'Sorry, Billy-boy, you never had a chance.', voice: 'billy-boy' },
      { lash: 'You knew what was going to happen the moment you picked a fight with The Lash.', voice: 'picked-a-fight' },
      { lash: 'Another problem solved by The Lash.', voice: 'problem-solved' },
      { lash: 'You just watched a master at work.', voice: 'master' },
      { rem: 'He\'s so cool.' },
      { lash: 'Boush.', voice: 'boush' },
      { lash: 'The Lash is undeniable.', voice: 'undeniable' },
      { choose: [
        { alex: 'Thank you, Lash.', then: [
          { lash: 'You\'re welcome.', voice: 'youre-welcome' },
        ] },
        { alex: 'You know we did most of the work, right?', then: [
          { lash: 'Hm? Sorry, couldn\'t hear you over how great I was.' },
        ] },
      ] },
      { lash: 'Oh, and some fancy fella left one of these in my locker.' },
      { lash: 'Called me "sir". Nobody calls The Lash "sir".' },
      { lash: '…I liked it.' },
      { lash: 'You\'re welcome, Rem.', voice: 'welcome-rem' },
    ],
  },
  {
    id: 'viscous', name: 'Viscous', district: 'uptown', desc: 'Friendliest goo in town', bg: tone('#5b2d78', '#220e30'), ...look('viscous'),
    walk: [
      'You and Rem wander uptown, past shiny shop windows.',
      'Rem is telling you, very slowly, about his favourite pillow…',
      '…when your foot lands on something soft and wet.',
      'You slip, and land flat on your back.',
    ],
    clue: 'Held the door open. Dresses fancy… for work?',
    appearsLater: true, // he's just a puddle at first
    talk: [
      { alex: 'Ow…' },
      { alex: 'What the hell is this? Ew… it\'s green goo.' },
      { rem: 'Pretty green.', voice: 'pretty-green' },
      { alex: 'Rem, don\'t touch it!' },
      { rem: 'I got goo on me.', voice: 'got-goo' },
      { alex: '…Did that puddle just move?', thought: true },
      { appear: true },
      { viscous: 'I\'m Viscous.', voice: 'im-viscous' },
      { viscous: 'Hello.', voice: 'hello' },
      { choose: [
        { alex: 'Sorry I stepped on you.', then: [
          { viscous: 'That\'s okay. New York is already messy, they won\'t notice.', voice: 'ny-messy' },
        ] },
        { alex: 'You\'re… a puddle?', then: [
          { viscous: 'I am not a pile of goo. I\'m merely piloting a pile of goo…', voice: 'piloting' },
        ] },
      ] },
      { alex: 'Ugh. It\'s all over my shoes.' },
      { viscous: 'I don\'t get why people think it\'s gross.', voice: 'think-its-gross' },
      { viscous: 'It\'s not just restorative, it\'s great for your skin.', voice: 'great-for-skin' },
      { viscous: 'Do you like goo?', voice: 'do-you-like-goo' },
      { rem: 'Goo is fun to play with.', voice: 'goo-fun' },
      { rem: 'I want you to be my friend.', voice: 'want-friend' },
      { viscous: 'I made a friend!', voice: 'made-a-friend' },
      { alex: 'Wait… there\'s something floating in the goo. Something gold.', thought: true },
      { alex: 'Is that… a torn ticket?' },
      { viscous: 'Oh, this? A fancy man gave it to me.' },
      { viscous: 'I asked him…' },
      { viscous: 'Do you always dress fancy or is it just for work?', voice: 'fancy-for-work' },
      { alex: 'What did he say?' },
      { viscous: 'Nothing. He just smiled and held the door open for me.' },
      { viscous: 'Nobody holds doors for goo.' },
      { alex: 'Fancy. Again.', thought: true },
      { viscous: 'Do you want it?' },
      { choose: [
        { alex: 'Yes, please. If you don\'t want it.' },
        { alex: 'Not really… it\'s covered in goo.', then: [
          { viscous: 'People think it\'s gross, I think it\'s home.', voice: 'gross-home' },
          { alex: '…Okay, okay. Yes, please.' },
        ] },
      ] },
      { viscous: 'Why?', voice: 'why' },
      { alex: 'It\'s a ticket to a party. We\'re trying to find it.' },
      { viscous: 'A party? I\'ve never been to a party.' },
      { viscous: 'In The Deep, we just float.' },
      { viscous: 'What do you do at a party?' },
      { choose: [
        { alex: 'You dance, you eat cake, you see your friends.' },
        { alex: 'Pretty much what you do in The Deep. But with music.' },
      ] },
      { viscous: 'Oh, that sounds more fun. OK!', voice: 'more-fun' },
      { viscous: 'But first… let\'s play a game!' },
      { viscous: 'I\'ll hide the ticket in a goo cube. You find it.' },
      { rem: 'Viscous likes cubes. I like pillows.', voice: 'cubes-pillows' },
      { game: 'cubes' },
      { viscous: 'You can have it, friend. It\'s a little sticky.' },
      { viscous: 'There\'s so much to see in New York.', voice: 'so-much-to-see' },
      { rem: 'He\'s so silly.', voice: 'so-silly' },
    ],
    givesPiece: true,
  },
];
// the usual files for a hero, and their card colour (lighter at the top, darker at the bottom)
function look(id) { return { img: `assets/img/${id}.png`, head: `assets/img/${id}-head.png`, art: `assets/img/${id}-bg.webp`, nameImg: `assets/img/${id}-name.webp` }; }
function tone(top, bottom) { return `radial-gradient(120% 90% at 50% 20%, ${top}, ${bottom})`; }
// typed out once, between Vyper and the first look at the map
const MAP_INTRO = [
  'Two pieces down.',
  'The rest are scattered somewhere across the city…',
];
const END_HINT = 'To be continued…';

// ---------- The guess: who is the mysterious man? ----------
// wrong hero names get that hero's reply: [pattern, hero, words, voice]; anything else gets Rem's "Hmm…"
const WRONG_GUESSES = [
  [/\brem\b/, 'rem', 'You\'re silly…', 'youre-silly'],
  [/vyper|viper|^v$/, 'vyper', 'No one\'s that nice.', 'that-nice'],
  [/viscous/, 'viscous', 'I\'m goo.', 'im-goo'],
  [/drifter/, 'drifter', 'Not your day, friend.', 'not-your-day'],
  [/graves/, 'graves', 'Stop being weird.', 'stop-weird'],
  [/\bmo\b|krill|maurice/, 'mokrill', 'No hats. No vests.', 'no-hats'],
  [/lash/, 'lash', 'The Lash says no.', 'says-no'],
  [/billy/, 'billy', 'What a joke.', 'joke'],
  [/rat ?king|\brats?\b|ronnie/, 'ratking', 'You picked the wrong side, pal.', 'wrong-side'],
  [/violet/, 'violet', 'This is between you and Hathorne, not me.', 'not-me'],
  [/nurse|harrow/, 'nurse', 'No no my dear, that simply won\'t do.', 'wont-do'],
  [/danny|deadman/, 'danny', 'Have a patron problem? Try the Chimera Mark 1 today!', 'patron-problem'],
  [/broker/, 'rem', 'He has a fancy hat… but no.'],
];
const GUESS_HINT = 'Hint! He opens doors for people. All day long. And he always says "welcome".';

// ---------- The Baroness: the Doorman's reveal, then the party ----------
const DOORMAN = {
  id: 'doorman', name: 'The Doorman', desc: 'Humble servant', bg: tone('#d9a428', '#7a4f08'), ...look('doorman'), music: 'baroness',
  talk: [
    { doorman: 'Well spotted.' },
    { doorman: 'Splendid job.', voice: 'splendid' },
    { doorman: 'I am at your service.', voice: 'at-your-service' },
    { choose: [
      { alex: 'YOU left the ticket pieces? All over the city?' },
      { alex: 'You\'re the fancy man who smells like soap!', then: [
        { doorman: 'I do take hygiene very seriously.' },
      ] },
    ] },
    { doorman: 'Someone in the city left you a message.' },
    { doorman: 'I merely… delivered it. In pieces.' },
    { choose: [
      { alex: 'Why all the mystery?', then: [
        { doorman: 'Because, dear guest, the best gifts are the ones you find yourself.' },
      ] },
      { alex: 'Rem… did you know about this?', then: [
        { rem: 'No! …I don\'t think so.' },
      ] },
    ] },
    { doorman: 'Every guest you met tonight was given a piece. And every one of them gave it to you.' },
    { doorman: 'Well. One of them needed some persuading.' },
    { doorman: 'I believe the last piece is mine to give.' },
    { give: 'The last piece' },
    { assemble: true },
    { doorman: 'Happy birthday, Alex.' },
    { doorman: 'May your time in New York be unforgettable.', voice: 'unforgettable' },
    { doorman: 'Your elevator awaits.', voice: 'elevator-awaits' },
    { doorman: 'Right this way.', voice: 'right-this-way' },
  ],
};
// guests who are only at the party (party: their lines there)
const PARTY_GUESTS = [
  { id: 'ratking', name: 'Rat King', desc: 'Long Island Conqueror', bg: tone('#6b4a2a', '#2a1a0c'), ...look('ratking') },
  { id: 'violet', name: 'Violet', desc: 'Insecurity Incarnate', bg: tone('#8a3d78', '#2e0f29'), ...look('violet') },
  { id: 'nurse', name: 'Nurse Harrow', desc: 'Doctor\'s orders', bg: tone('#3f6f8a', '#0f2633'), ...look('nurse') },
  { id: 'danny', name: 'Deadman Danny', desc: 'Business cards available', bg: tone('#3b6f6b', '#0e2a28'), ...look('danny') },
];
// what everyone says at the party, in the order their cards sit in the lobby
const PARTY = {
  doorman: [
    { doorman: 'Lovely to see you again.', voice: 'lovely-again' },
    { alex: 'You look like you haven\'t aged a day.' },
    { doorman: 'I haven\'t.', voice: 'i-havent' },
    { alex: 'You need to tell me your secret.' },
    { doorman: 'That would spoil the fun.', voice: 'spoil-fun' },
    { alex: 'You\'re terrible.' },
    { doorman: 'You wouldn\'t have it any other way.', voice: 'any-other-way' },
    { doorman: 'It\'s an honor to be of service.', voice: 'honor' },
    { doorman: 'The cake is on the house. As is everything else tonight.' },
    { doorman: 'Enjoy your stay.', voice: 'enjoy-stay' },
  ],
  vyper: [
    { vyper: 'Time to celebrate.', voice: 'celebrate' },
    { vyper: 'Happy birthday, buddy! I saved V a seat. Right next to the cake.' },
    { rem: 'She still owes me ice cream.' },
    { vyper: 'Put it on my tab, kid.' },
  ],
  viscous: [
    { viscous: 'You\'re all my new best friends.', voice: 'best-friends' },
    { viscous: 'Happy birthday, friend! I made you a cube.' },
    { choose: [
      { alex: '…Thank you?' },
      { alex: 'Is it… goo?', then: [{ viscous: 'Of course. It\'s warm.' }] },
    ] },
    { viscous: 'You look fancy.', voice: 'look-fancy' },
    { alex: 'If you want to see fancy, you should come to more parties like this.' },
    { viscous: 'Ok.', voice: 'ok' },
    { alex: 'That… that wasn\'t an invitation.' },
    { viscous: 'You said I should attend, and I said Ok.', voice: 'said-attend' },
    { alex: 'You… have me there.' },
    { viscous: 'I\'m going to be fancy…', voice: 'be-fancy' },
  ],
  // the deal from the alley comes due: Drifter wants his room full of humans… and meets the Doorman
  drifter: [
    { drifter: 'Happy birthday, friend.' },
    { drifter: 'A deal\'s a deal. You brought me to the party.' },
    { drifter: 'Now… which one of these fancy folks do I get to eat?' },
    { alex: 'Uh oh.', thought: true },
    { narrate: 'The Doorman is suddenly standing right next to you. Nobody saw him walk over.' },
    { doorman: 'Is everything to your liking, sir?' },
    { drifter: 'Do your job or I\'m going to tear through your little hotel.', voice: 'tear-through' },
    { doorman: 'No sir, you will not.', voice: 'you-will-not' },
    { drifter: 'Excuse me?', voice: 'excuse-me' },
    { doorman: 'I will do my job because I value excellence. You will not lay a finger on its guests, lest your immortal life meet an ignoble end. Am I clear?', voice: 'never-a-finger' },
    { drifter: 'Who the hell are you?', voice: 'who-the-hell' },
    { doorman: 'I\'m just the doorman.', voice: 'just-the-doorman' },
    { narrate: 'And just like that, he\'s gone again.' },
    { choose: [
      { alex: 'Sorry, Drifter. I kind of lied about the humans.', then: [{ drifter: 'I figured, friend. Clever little lie.' }] },
      { alex: 'Maybe just have some cake?', then: [{ drifter: 'Cake.' }] },
    ] },
    { drifter: 'Only cake, then. It\'s a lot less fun for me.', voice: 'less-fun' },
  ],
  graves: [
    { graves: '…Happy birthday, I guess.' },
    { graves: 'The cake\'s actually good. Don\'t tell anyone I said that.' },
    { rem: 'Do you like bowling?', voice: 'bowling' },
    { graves: 'What.', voice: 'what' },
  ],
  mokrill: [
    { mokrill: 'Tonight we toast to victory.', voice: 'toast' },
    { mokrill: '…and to you, friend. Happy birthday.' },
    { alex: 'Is Maurice wearing a hat?' },
    { mokrill: 'The hat can stay. But no vest.' },
    { alex: 'Thank you… for everything.' },
    { mokrill: 'You don\'t need to thank us. It was a privilege.', voice: 'privilege' },
    { alex: 'I love you both.' },
    { mokrill: 'We love you too.', voice: 'love-you-too' },
  ],
  lash: [
    { lash: 'Happy birthday, kid. Your present is me. Being here.' },
    { choose: [
      { alex: 'Wow. Thanks.', then: [{ lash: 'You\'re welcome.', voice: 'youre-welcome' }] },
      { alex: 'I\'d rather have cake.', then: [{ lash: 'Nobody would rather have cake.' }] },
    ] },
  ],
  billy: [
    { billy: 'Psh. Thanks for the invite… I guess.' },
    { billy: 'Sorry about the, uh. Bashdown.' },
    { rem: 'I have big feelings too, Billy.', voice: 'big-feelings' },
    { billy: 'Let\'s party!', voice: 'lets-party' },
  ],
  ratking: [
    { choose: [
      { alex: 'Hi!' },
      { alex: 'Hi, Rat King!' },
    ] },
    { ratking: 'Happy birthday, pal.' },
    // their real in-game back-and-forth (clips from Ibra): ask, "Nuh-uh!", Rem screams, "That ain't happening!"
    { rem: 'I wanna play with Rabies Ronnie.', voice: 'ronnie' },
    { ratking: 'Nuh-uh!', voice: 'nuh-uh' },
    { rem: 'I WANNA PLAY WITH RABIES RONNIE!', voice: 'ronnie-shout' },
    { ratking: 'THAT AIN\'T HAPPENING!', voice: 'aint-happening' },
  ],
  violet: [
    { violet: 'Hey, I\'m Violet.', voice: 'hey-violet' },
    { violet: 'Happy birthday! I\'m painting the party.' },
    { violet: 'This is taking me back to awkward parties freshman year.', voice: 'awkward-parties' },
    { choose: [
      { alex: 'Can you paint me?', then: [{ violet: 'Already did. You\'re in the corner, next to the rat.' }] },
      { alex: 'Is that paint on the Doorman?', then: [{ violet: 'Shh. He hasn\'t noticed yet.' }] },
    ] },
    { violet: 'I love happy accidents.', voice: 'happy-accidents' },
  ],
  nurse: [
    { nurse: 'You will address me as Nurse Harrow.', voice: 'address-me' },
    { nurse: 'Happy birthday. Another year older.' },
    { nurse: 'If you\'ve survived this long congratulations, you\'ve beat the odds.', voice: 'beat-odds' },
    { rem: 'She should get a pillow instead of that bag.', voice: 'pillow-bag' },
    { nurse: 'Act like a child and I\'ll treat you like one.', voice: 'act-child' },
  ],
  danny: [
    { danny: 'Deadman Danny at your service.', voice: 'at-service' },
    { danny: 'Happy birthday, on behalf of Fairfax Industries!' },
    { danny: 'Hey before this thing gets started anyone need a business card?', voice: 'business-card' },
    { choose: [
      { alex: '…Sure?', then: [{ danny: 'Wonderful! Call me when you need a jetpack.' }] },
      { alex: 'At a birthday party?', then: [{ danny: 'Networking never sleeps, friend.' }] },
    ] },
  ],
};
// the very last talk: Rem, once Alex has seen everyone
const GOODBYE = [
  { rem: 'This party\'s fun!', voice: 'party-fun' },
  { rem: '<happy squawk>', voice: 'happy-squawk' },
  { rem: 'We found the party.' },
  { rem: 'And it was YOUR party the whole time.' },
  { choose: [
    { alex: 'Did you know, Rem?', then: [{ rem: '…Maybe.' }] },
    { alex: 'Thank you for helping me, Rem.', then: [{ rem: 'You helped me first.' }] },
  ] },
  { rem: 'Happy birthday, Alex.' },
  { rem: 'We friends?', voice: 'we-friends' },
  { choose: [
    { alex: 'Friends forever.', then: [{ rem: 'Friends forever!', voice: 'friends-forever' }] },
    { alex: 'Nap buddies.', then: [{ rem: 'Ya, nap buddies!', voice: 'nap-buddies' }] },
  ] },
  { rem: 'Anyone else want to take a nap?', voice: 'nap-anyone' },
  { rem: 'Nap time!', voice: 'nap-time' },
  { asleep: true },
];
// ---------- The Broker: an optional shop on the map. His cursed ticket shows a strong clue… but Phoebe eats paper. ----------
const BROKER = {
  id: 'broker', name: 'The Broker', desc: 'Always a catch', bg: '#1a0a10', music: 'brokerShop',
  img: 'assets/img/broker/broker_shop.webp', head: 'assets/img/broker-head.png', nameImg: 'assets/img/broker-name.webp', art: 'assets/img/broker/broker_hands.webp',
  clue: 'A ring of golden keys. A little brass sign: "At your service".', // only listed if Alex bought the cursed ticket
  talk: [
    { broker: 'Psst… over here, friend.' },
    { rem: 'Is this where they sell pillows?' },
    { broker: 'Pillows? Oh, I\'ve got pillows.' },
    { broker: 'This one\'s so soft, you never wake up again.' },
    { rem: 'But I want it', voice: 'want-it' },
    { alex: 'No.' },
    { choose: [
      { alex: 'What do you sell?', then: [
        { broker: 'Upgrades, friend. Unthinkable ones.' },
        { broker: '…but there\'s always a catch.' },
      ] },
      { alex: 'Are you even allowed to be here?', then: [
        { broker: 'Not for long. That\'s why it\'s a limited time offer.' },
      ] },
    ] },
    { broker: 'Word on the street is you\'re looking for a mysterious man.' },
    { alex: 'How do you know that?' },
    { broker: 'Knowing things is my business. And I\'ve got something that knows things too.' },
    { game: 'shop' },
  ],
};
const BROKER_BUY = [
  { broker: 'Pleasure doing business.' },
  { alex: 'The ticket is warm. And it\'s… jingling?', thought: true },
  { alex: 'There\'s something inside it. A big ring of golden keys…', thought: true },
  { alex: '…and a little brass sign that says "At your service".', thought: true },
  { broker: 'Now. About the catch.' },
  { broker: 'Every item has a price. Yours has whiskers.' },
  { phoebe: true },
  { alex: 'PHOEBE. NO. Not the paper!' },
  { rem: 'They cute.', voice: 'they-cute' },
  { broker: 'Told you, friend. Always a catch.' },
];
// if Alex tries to walk away (he can't: Rem won't let him, and the Broker knows it)
const BROKER_PASS = [
  { broker: 'Your loss, friend. I won\'t be around for long.' },
  { rem: 'No! Wait!' },
  { rem: 'But I want to know who the fancy man is!' },
  { broker: 'Heh. They always come back.' },
];
const HERO = Object.fromEntries([...CAST, DOORMAN, ...PARTY_GUESTS, BROKER].map((g) => [g.id, g]));

// ---------- Scenes ----------
const $ = (id) => document.getElementById(id);
const gate = $('gate'), intro = $('intro'), guest = $('guest'), wander = $('wander');
const card = $('card'), chat = $('chat'), nudge = $('nudge');
const paper = $('paper');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const still = matchMedia('(prefers-reduced-motion: reduce)').matches; // no letter-by-letter animation for people who turn motion off

function show(scene) {
  document.querySelectorAll('.scene').forEach((s) => s.classList.remove('is-active'));
  if (scene) scene.classList.add('is-active');
}

// split text into letters so it can appear one letter at a time without the line shifting
// (wrap = long text that may break onto the next line between words)
function spell(el, text, wrap) {
  el.setAttribute('aria-label', text);
  el.innerHTML = [...text].map((c) => `<span class="ch" aria-hidden="true">${c === ' ' ? (wrap ? ' ' : '&nbsp;') : c}</span>`).join('');
  return [...el.children];
}

// the story: the guests without a district (Rem, then Vyper) one after another, then the city map
async function story(from = 0) {
  for (const g of CAST.filter((g) => !g.district).slice(from)) await play(g);
  await walk({ walk: MAP_INTRO });
  openMap();
}

// one guest: the front page (if they have one), the walk, then meeting them
const met = new Set();
async function play(g) {
  if (g.headline) await arrive(g);
  if (g.walk) await walk(g);
  await meet(g);
  met.add(g.id);
}

// the front page spins in and waits for a click
async function arrive(g) {
  $('paperHeadline').textContent = g.headline;
  $('paperCaption').textContent = g.caption;
  $('paperStory').textContent = g.story;
  $('paperImg').src = g.img;
  $('paperImg').style.background = g.bg;

  show(null); // whatever is on screen drifts back and fades
  paper.hidden = false;
  paper.className = 'paper is-spinning';
  await wait(1150); // let it land before a click counts
  await new Promise((r) => paper.addEventListener('click', r, { once: true }));

  paper.className = 'paper is-leaving';
  await wait(750);
  paper.hidden = true;
}

// "You wander deeper into the city…": each line writes itself out, then the guest appears
async function walk(g) {
  const box = $('wanderText');
  box.innerHTML = '';
  show(wander);
  await wait(700);
  for (const text of g.walk) {
    const p = document.createElement('p');
    box.append(p);
    for (const ch of spell(p, text)) { ch.classList.add('is-in'); if (!still) await wait(38); }
    await wait(still ? 300 : 1000);
  }
  await wait(1200);
}

// the guest's card drops in (asleep if they sleep), Alex reacts, and a click wakes them and starts the talk
async function meet(g) {
  $('cardImg').src = g.img;
  $('cardImg').alt = g.name;
  $('cardTag').innerHTML = `<small>Admit one</small>${g.desc}`;
  card.setAttribute('aria-label', `Talk to ${g.name}`);
  card.style.setProperty('--guest-bg', g.bg);
  card.classList.toggle('is-sleepy', !!g.sleepImg);
  if (g.sleepImg) $('cardSleepImg').src = g.sleepImg;
  chat.innerHTML = '';
  nudge.hidden = true;
  if (g.asleepMusic) music(g.asleepMusic);
  guest.classList.toggle('is-hiding', !!g.appearsLater);
  // restart the drop-in animation
  guest.classList.remove('is-active'); void guest.offsetWidth;
  show(guest);

  await wait(1100);
  await run(g.found || []);
  if (g.sleepImg) { // a sleeper waits for a click to wake
    nudge.textContent = g.wakeHint || `Click ${g.name} to wake them up`;
    nudge.hidden = false;
    await new Promise((r) => card.addEventListener('click', r, { once: true }));
    nudge.hidden = true;
    card.classList.remove('is-sleepy'); // once woken, they stay awake
  }
  music(g.music || 'talk');
  await run(g.talk || [{ [g.id]: `(${g.name}'s scene isn't written yet.)` }]);
  if (g.returns && stolen >= 0) await givePiece(stolen, 'You got your piece back');
  if (g.givesPiece) await givePiece();
  if (g.objective) await objective(g.objective);
}

// ---------- The city map: Downtown and Uptown "?" cards, the Baroness locked in Midtown ----------
const mapScene = $('map'), baroness = $('baroness'), mapNudge = $('mapNudge');
let busy = false;

function cardFace(g) {
  return `<span class="card__tag"><small>Admit one</small>${g.desc}</span>
    <span class="card__frame"><span class="card__pic"><img class="card__img" src="${g.img}" alt="${g.name}"></span></span>`;
}
const cardBack = '<span class="card__frame"><span class="card__back">?</span></span>';

// draw the map; the guest just met still shows "?" so their card can flip over in front of Alex
function drawMap(justMet) {
  mapScene.querySelectorAll('[data-district]').forEach((d) => {
    d.querySelector('.district__cards').innerHTML = CAST.filter((g) => g.district === d.dataset.district).map((g) => {
      const open = met.has(g.id) && g.id !== justMet;
      return `<div class="spot"><button class="card mcard${open ? ' is-met' : ''}" type="button" data-id="${g.id}"
        style="--guest-bg:${g.bg}" aria-label="${open ? g.name : 'Someone unknown'}">${open ? cardFace(g) : cardBack}</button></div>`;
    }).join('');
  });
}

// ---------- Saving: back on the map = progress saved in this browser, so a refresh or a closed tab isn't the end ----------
// only who Alex met (in order: that decides which piece each gave), the Broker, and Phoebe's bite are needed
const SAVE = 'alex-birthday-save';
function remember() { try { localStorage.setItem(SAVE, JSON.stringify({ met: [...met], boughtCurse, bitten })); } catch {} }
function forget() { try { localStorage.removeItem(SAVE); } catch {} }
function saved() { try { return JSON.parse(localStorage.getItem(SAVE)); } catch { return null; } }
// rebuild the ticket holder from a save (or a test jump) and go to the map
function resume(s) {
  document.fonts.load('46px Pulp').then(() => {
    boughtCurse = !!s.boughtCurse; bitten = s.bitten ?? -1;
    for (const id of s.met) { const d = HERO[id]; if (!d) continue; met.add(id); if (d.givesPiece) holder.insertAdjacentHTML('beforeend', pieceHTML(FOUND_ORDER[collected++])); }
    if (met.has('billy') && !met.has('lash')) { stolen = 0; holder.querySelector('.piece[data-slot="0"]')?.remove(); } // Billy still has it
    holder.hidden = !collected; countLabel();
    openMap();
  });
}

async function openMap(justMet) {
  remember();
  drawMap(justMet);
  mapNudge.hidden = true;
  music('theme');
  show(mapScene);
  if (justMet) { await wait(600); await flip(justMet); }
  // the Broker's shop pops up once Alex has met two people on the map, and stays until he's been (it's required)
  const onMap = CAST.filter((g) => g.district && met.has(g.id)).length;
  $('brokerSign').hidden = boughtCurse || onMap < 2;
  await lightBaroness();
  busy = false;
}

// a card turns over: squashes to a sliver, swaps to the hero, springs back
async function flip(id) {
  const btn = mapScene.querySelector(`[data-id="${id}"]`), g = HERO[id];
  btn.parentElement.classList.add('is-flipping');
  flipSound();
  await wait(260);
  btn.innerHTML = cardFace(g); btn.classList.add('is-met'); btn.setAttribute('aria-label', g.name);
  await wait(400);
  btn.parentElement.classList.remove('is-flipping');
}

// the windows of the Baroness, drawn row by row so they can light up from the bottom floor to the top
(function buildWindows() {
  const rows = 10, cols = 9;
  let html = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const teaser = [13, 22, 40, 51, 67, 74, 85].includes(r * cols + c); // a few are already lit: something's going on in there
    html += `<rect class="win${teaser ? ' is-lit' : ''}" x="${61 + c * 11}" y="${140 + r * 16}" width="5" height="10" style="--d:${(rows - 1 - r) * 110}ms"/>`;
  }
  $('bWins').innerHTML = html;
})();

// a nameless "?" tower until every piece but the Doorman's is in; then it lights up floor by floor and gets its name
async function lightBaroness() {
  if (have() >= TICKET.length - 1 && boughtCurse && !baroness.classList.contains('is-open')) { // the Broker's visit is required too
    await wait(600);
    baroness.classList.add('is-open', 'is-named');
    if (!$('bAsh').children.length) embers($('bAsh'), 210, 330, 55); // golden ashes around the lit tower
    $('baronessName').textContent = 'The Baroness';
    $('baronessNote').textContent = 'Open';
    await wait(1600);
    say('Midtown is open.');
  }
}

function say(text) { mapNudge.textContent = text; mapNudge.hidden = false; }
function shake(el) { el.classList.remove('is-shaking'); void el.offsetWidth; el.classList.add('is-shaking'); }

mapScene.addEventListener('click', (e) => {
  if (busy) return;
  const btn = e.target.closest('.mcard');
  if (btn && !btn.classList.contains('is-met')) {
    const g = HERO[btn.dataset.id];
    if (g.after && !met.has(g.after)) { shake(btn.parentElement); return say(`Not yet. Something's going on in ${cap(g.district)} first…`); }
    busy = true;
    play(g).then(() => openMap(g.id));
  } else if (e.target.closest('#brokerSign')) {
    busy = true;
    brokerVisit().then(() => openMap());
  } else if (e.target.closest('#baroness')) {
    if (!baroness.classList.contains('is-open')) {
      shake(baroness);
      return say(have() >= TICKET.length - 1 ? 'Midtown is still locked. Something\'s missing… maybe the Broker knows.' : 'Midtown is locked. Find every torn ticket piece first.');
    }
    busy = true;
    finale();
  }
});

// ---------- The finale: guess the mysterious man, the Doorman, the whole ticket, the party ----------
// the right name pulls Alex into the Doorman's ultimate (his pocket hotel), where they talk;
// at the end the EXIT door opens onto the real Baroness and the party
// at the Midtown gate, right before the party: Drifter is waiting there, because of the deal in his alley
const BEFORE_PARTY = [
  { narrate: 'Midtown. Someone is leaning on the gate, whistling.' },
  { appear: true },
  { drifter: 'Evenin\', friends. Told you I\'d be listenin\' for that party.' },
  { drifter: 'You ready for what\'s coming?', voice: 'ready-coming' },
  { alex: 'I don\'t think anyone can be ready for something like this.' },
  { alex: 'All I know is that my friend needs me, and I\'ll do anything I can to help him.' },
  { rem: 'Really?', voice: 'really' },
  { alex: 'Really.' },
  { rem: 'Thank you.', voice: 'thank-you' },
  { drifter: 'Ain\'t that sweet. After you, friends.' },
];

async function finale() {
  await meet({ ...HERO.drifter, sleepImg: null, appearsLater: true, found: null, objective: null, givesPiece: false, returns: false, music: 'brokerApproach', talk: BEFORE_PARTY });
  await guessName();
  await castUlt();
  await meet({ ...DOORMAN });
  document.body.classList.add('is-exiting'); // the EXIT door swells up and fills the screen with light
  show(null);
  await wait(1400);
  document.body.classList.remove('in-ult', 'is-exiting');
  document.body.classList.add('at-baroness');
  openLobby();
}

const guessBox = $('guess');
function guessReply(who, text, file) {
  const h = HERO[who];
  $('guessFace').style.backgroundImage = `url('${h.head}')`;
  $('guessName').src = h.nameImg; $('guessName').alt = h.name;
  $('guessSay').textContent = text;
  $('guessHost').classList.remove('is-new'); void $('guessHost').offsetWidth; $('guessHost').classList.add('is-new', 'is-talking');
  const done = file ? speak(`assets/audio/${who}/${file}.mp3`) : wait(1200);
  done.then(() => $('guessHost').classList.remove('is-talking'));
}

// Alex types names until he gets it; every clue he collected is listed to help
async function guessName() {
  $('guessClues').innerHTML = [...CAST, ...(boughtCurse ? [BROKER] : [])].filter((g) => g.clue && (met.has(g.id) || g === BROKER)).map((g) => `<li><b>${g.name}:</b> ${g.clue}</li>`).join('');
  guessBox.hidden = false; void guessBox.offsetWidth; guessBox.classList.add('is-in');
  music('brokerApproach'); // the mysterious one
  guessReply('rem', 'Who do you think the mysterious man is?');
  $('guessInput').value = ''; $('guessInput').focus();
  let wrong = 0;
  await new Promise((done) => {
    $('guessForm').onsubmit = (e) => {
      e.preventDefault();
      const name = $('guessInput').value.toLowerCase().replace(/[^a-z ]/g, '').replace(/^the /, '').trim();
      if (!name) return;
      $('guessInput').value = '';
      if (name.replace(/ /g, '').includes('doorman')) { guessReply('rem', 'YES!', 'yay'); setTimeout(done, 1400); return; }
      const hit = WRONG_GUESSES.find(([re]) => re.test(name));
      if (hit) guessReply(hit[1], hit[2], hit[3]); else guessReply('rem', 'Hmm… I don\'t think so.');
      if (++wrong === 3) setTimeout(() => guessReply('rem', GUESS_HINT), 2600);
    };
  });
  guessBox.classList.remove('is-in');
  await wait(600);
  guessBox.hidden = true;
}

// his ultimate, cast on Alex (sounds taken from the game): he walks up out of the dark ("Checking in?"), raises his hand,
// the gold key-halo and beams burst out ("Welcome to The Baroness."), Alex is locked in cyan light with a turning key,
// then a flash and everything warps away into his pocket hotel
const KEY_SHAPE = '<circle cx="30" cy="30" r="24" fill="none" stroke="#f2c24a" stroke-width="9"/><circle cx="30" cy="30" r="8" fill="#f2c24a"/><rect x="25" y="52" width="10" height="100" rx="4" fill="#f2c24a"/><rect x="35" y="118" width="18" height="9" fill="#f2c24a"/><rect x="35" y="134" width="12" height="9" fill="#f2c24a"/>';
const ultCast = new Audio('assets/audio/sfx/ult-cast.mp3'), ultWarp = new Audio('assets/audio/sfx/ult-warp.mp3');
ultCast.volume = .5; ultWarp.volume = .5;
async function castUlt() {
  const c = $('cast');
  show(null);
  holder.hidden = true;
  if (track) fade(track, .03, 1200); // the music holds its breath
  $('castKeys').innerHTML = Array.from({ length: 12 }, (_, i) => `<svg class="fkey" viewBox="0 0 60 160" style="left:${8 + Math.random() * 84}%;top:${45 + Math.random() * 45}%;--t:${2.4 + Math.random() * 2}s;--d:${-Math.random() * 3}s;--r:${(Math.random() - .5) * 90}deg">${KEY_SHAPE}</svg>`).join('');
  c.hidden = false; c.className = 'cast'; void c.offsetWidth; c.classList.add('is-in');
  await wait(500);
  c.classList.add('is-approaching');
  await wait(1400);
  await speak('assets/audio/doorman/checking-in.mp3');
  await wait(800);
  c.classList.replace('is-approaching', 'is-casting');
  ultCast.currentTime = 0; ultCast.play().catch(() => {});
  await wait(500);
  await speak('assets/audio/doorman/welcome-baroness.mp3');
  c.classList.add('is-locking');
  await wait(3200);
  ultWarp.currentTime = 0; ultWarp.play().catch(() => {});
  c.classList.add('is-warping');
  await wait(900);
  document.body.classList.add('in-ult'); // the void and the floating hotel are waiting behind the warp
  music('baroness');
  await wait(600);
  c.classList.remove('is-in');
  await wait(800);
  c.hidden = true; c.className = 'cast';
}

// debris drifting through the void inside his ultimate
(function buildDebris() {
  $('ultDebris').innerHTML = Array.from({ length: 18 }, () => {
    const r = (a, b) => (a + Math.random() * (b - a)).toFixed(1), edge = Math.random() < .5;
    const x = edge ? r(-5, 22) : r(78, 102); // mostly around the edges, away from the corridor
    return `<span class="debris" style="left:${x}%;top:${r(-5, 95)}%;width:${r(30, 140)}px;height:${r(24, 110)}px;--r:${r(-60, 60)}deg;--dx:${r(-60, 60)}px;--dy:${r(-50, 50)}px;--t:${r(7, 16)}s;--d:${r(-10, 0)}s"></span>`;
  }).join('');
})();

// golden ashes: little glowing embers that drift up and fade, scattered along the edge of a w × h box
function embers(box, w, h, count) {
  box.insertAdjacentHTML('beforeend', Array.from({ length: count }, () => {
    const d = Math.random() * 2 * (w + h);
    const [x, y] = d < w ? [d, 0] : d < w + h ? [w, d - w] : d < 2 * w + h ? [2 * w + h - d, h] : [0, 2 * (w + h) - d];
    const r = (a, b) => (a + Math.random() * (b - a)).toFixed(2);
    return `<span class="ember" style="left:${x}px;top:${y}px;--s:${r(2, 6)}px;--dx:${r(-40, 40)}px;--rise:${r(40, 130)}px;--t:${r(2.2, 4.8)}s;--d:${r(-5, 0)}s"></span>`;
  }).join(''));
}

// the whole ticket: each piece lights up in turn, then its gold edge glows and golden ashes drift up around it
async function assembleTicket() {
  const box = $('whole'), t = $('wholeTicket');
  const fit = Math.min(.92 * innerWidth / slotX.at(-1), 1);
  t.innerHTML = TICKET.map((w, i) => pieceHTML(i)).join('') + '<span class="whole__flare"></span>';
  t.style.setProperty('--fit', fit);
  embers(t, slotX.at(-1) * fit, 300 * fit, 90);
  box.hidden = false; void box.offsetWidth; box.classList.add('is-in');
  await wait(900);
  for (const [i, p] of [...t.querySelectorAll('.piece')].entries()) { p.classList.add('is-lit'); pieceChime(i); await wait(520); }
  magicSwell();
  box.classList.add('is-sparkling');
  await wait(1200);
  box.classList.add('is-done');
  await new Promise((r) => box.addEventListener('click', r, { once: true }));
  box.classList.remove('is-in');
  await wait(600);
  box.hidden = true;
  holder.hidden = true; // the ticket is whole now
}

// ---------- The party: every guest's card in the lobby; click one to zoom in and talk ----------
const lobby = $('lobby'), talkedTo = new Set();
// left: the friends Alex made on the way; right: the guests who were already at the Baroness
const LOBBY_LEFT = ['vyper', 'viscous', 'drifter', 'graves', 'mokrill', 'lash', 'billy'];
const LOBBY_RIGHT = ['doorman', 'ratking', 'violet', 'nurse', 'danny'];
// Ibra's message at the very end (\n starts a new line)
const IBRA_MESSAGE = `The person who left you a message is Ibra:
Hi Alex,
I hope you loved the adventure you took with Rem and the mini‑games. I've tried to make them as entertaining and "creative" as possible.
Thank you for being a comfort in my hardest times or empty days.
You're truly one of a kind, a gem and a very rare soul.
Happy Birthday.
Rem's Lil' Helper: Ibra.`;

// where each hero stands in their official render (% across), so the tall card crop is centered on them
const CARD_FOCUS = { vyper: 45, viscous: 56, drifter: 56, graves: 58, mokrill: 54, lash: 50, billy: 55, doorman: 56, ratking: 45, violet: 58, nurse: 52, danny: 44 };

function openLobby(from) {
  // two fanned rows per group: the cards tilt outward from the middle of their row, each floating on its own rhythm
  const cards = (ids) => {
    const first = Math.ceil(ids.length / 2);
    return [ids.slice(0, first), ids.slice(first)].map((row) => `<div class="lobby__row">${row.map((id) => card(id, row)).join('')}</div>`).join('');
  };
  const card = (id, row) => {
    const g = HERO[id], i = row.indexOf(id), t = i - (row.length - 1) / 2;
    return `<div class="pspot" style="--rot:${t * 5}deg;--dy:${Math.abs(t) * Math.abs(t) * 6}px;--delay:${-(LOBBY_LEFT.concat(LOBBY_RIGHT).indexOf(id)) * .9}s">
      <button class="pcard${talkedTo.has(id) ? ' is-talked' : ''}" type="button" data-id="${id}" style="--guest-bg:${g.bg};--fx:${CARD_FOCUS[id] ?? 50}" aria-label="${g.name}">
        <span class="pcard__frame"><img class="pcard__art" src="assets/img/${id}-render.webp" alt=""></span>
        <img class="pcard__name" src="${g.nameImg}" alt="${g.name}">
      </button></div>`;
  };
  $('lobbyLeft').innerHTML = cards(LOBBY_LEFT);
  $('lobbyRight').innerHTML = cards(LOBBY_RIGHT);
  if (!$('endAsh').children.length) embers($('endAsh'), $('theEnd').offsetWidth || 260, $('theEnd').offsetHeight || 90, 46);
  music('baroness');
  $('lobbyNudge').hidden = true;
  lobby.classList.toggle('is-back', !!from);
  show(lobby);
  if (!from) { $('lobbyNudge').textContent = 'Everyone came to the party. Go say hi!'; $('lobbyNudge').hidden = false; }
}

lobby.addEventListener('click', async (e) => {
  if (e.target.closest('#theEnd')) { if (!lobby.classList.contains('is-zooming')) goodbye(); return; }
  const btn = e.target.closest('.pcard');
  if (!btn || lobby.classList.contains('is-zooming')) return;
  const id = btn.dataset.id, r = btn.getBoundingClientRect();
  // zoom the whole lobby in toward the card, then talk
  lobby.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
  lobby.classList.add('is-zooming');
  await wait(650);
  lobby.classList.remove('is-zooming');
  await meet({ ...HERO[id], sleepImg: null, appearsLater: false, found: null, objective: null, givesPiece: false, returns: false, music: 'baroness', talk: PARTY[id] });
  talkedTo.add(id);
  openLobby(id);
});

// party cards lean toward the mouse, a little 3D
lobby.addEventListener('mousemove', (e) => {
  const c = e.target.closest('.pcard'); if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * 22}deg`);
  c.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - .5) * -18}deg`);
});
lobby.addEventListener('mouseout', (e) => { const c = e.target.closest('.pcard'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); } });

async function goodbye() {
  // the party music stays in the lobby; Rem's goodbye and the message get his Hideout theme, out on the neon street
  document.body.classList.replace('at-baroness', 'at-end');
  await meet({ ...HERO.rem, sleepImg: null, found: null, objective: null, givesPiece: false, music: 'sleeping', talk: GOODBYE });
  await wait(2500);
  // over the city: "Happy birthday, Alex", then Ibra's message writes itself out like the walks
  const end = $('end'), letter = $('endLetter');
  letter.innerHTML = '';
  show(end);
  await wait(2600);
  for (const text of IBRA_MESSAGE.split('\n')) {
    const p = document.createElement('p');
    letter.append(p);
    for (const ch of spell(p, text, true)) { ch.classList.add('is-in'); if (!still) await wait(38); }
    await wait(still ? 300 : 1000);
  }
  // Alex reads it for as long as he wants; the credits only start when he clicks
  await wait(3000);
  $('endNext').hidden = false;
  end.classList.add('is-waiting');
  await new Promise((r) => end.addEventListener('click', r, { once: true }));
  end.classList.remove('is-waiting');
  $('endNext').hidden = true;
  forget(); // the story is finished: next time starts from the beginning
  await rollCredits();
}

// the credits roll up like at the end of a film, over the City Never Sleeps poster
async function rollCredits() {
  const c = $('credits');
  music('theme'); // back to the song from the very start
  c.hidden = false; void c.offsetWidth; c.classList.add('is-in');
  const roll = $('creditsRoll');
  roll.classList.add('is-rolling');
  await new Promise((r) => roll.addEventListener('animationend', r, { once: true }));
  c.classList.add('is-done'); // the last card stays on screen, and the buttons rise up under it
}
// THE END closes the page. Browsers only let a page close itself if a script opened it,
// so if it's still open a moment later, the screen goes black with a thank-you instead.
$('theEndBtn').addEventListener('click', () => {
  if (track) fade(track, 0, 1500);
  $('credits').classList.add('is-closed');
  setTimeout(() => window.close(), 1600);
});
// Play again: back to the very first screen, fresh (the ending already cleared the save)
$('againBtn').addEventListener('click', () => { forget(); location.href = location.pathname; });
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// ---------- Minigame: Viscous's goo cubes. The ticket goes under one, they shuffle, Alex picks. ----------
// Three rounds, each faster; a wrong pick just replays the round (Viscous teases, nobody loses).
// say = what Viscous says before the round, win = when Alex finds it. [words, voice file]
const CUBE_ROUNDS = [
  { swaps: 5,  ms: 650, say: [['Time to play in goo.', 'play-in-goo'], ['Watch the ticket, friend.']], win: [['Nice job.', 'nice-job']] },
  { swaps: 8,  ms: 430, say: [['Goo is fun!', 'goo-is-fun'], ['A little faster now.']], win: [['That was lucky.', 'lucky']] },
  { swaps: 12, ms: 300, say: [['Let\'s do that again.', 'do-that-again'], ['Last one. Rolling goo…', 'rolling-goo']], win: [['I\'m shocked that worked.', 'shocked'], ['We make a good team.', 'good-team']] },
];
const CUBE_MISS = [['Nice try.', 'nice-try'], ['Oh, it\'s not a contest, the cube is just better.', 'cube-better'], ['We don\'t question the cube.', 'dont-question']];
const SLOT_X = [-230, 0, 230];
const cubesBox = $('cubes'), cubesTable = $('cubesTable');

// the hero running a minigame talks from the top of it: face rocks while the words appear and the voice plays
// (game = 'cubes' or 'tunnels': the ids of its host box and text; who = the hero's audio folder)
async function gameSay(game, who, lines) {
  const host = $(`${game}Host`), p = $(`${game}Say`);
  for (const [text, file] of lines) {
    host.classList.add('is-talking');
    const voiced = file ? speak(`assets/audio/${who}/${file}.mp3`) : Promise.resolve();
    for (let i = 1; i <= text.length; i++) { p.textContent = text.slice(0, i); await wait(LETTER); }
    await voiced;
    host.classList.remove('is-talking');
    await wait(900);
  }
}

// a cube slides from one spot to another, the front one swinging toward you and the back one away
function slide(el, from, to, ms, front) {
  el.style.zIndex = front ? 2 : 1;
  const a = el.animate([
    { transform: `translateX(${from}px)` },
    { transform: `translate(${(from + to) / 2}px, ${front ? 34 : -34}px) scale(${front ? 1.08 : .92})` },
    { transform: `translateX(${to}px)` },
  ], { duration: ms, easing: 'ease-in-out', fill: 'forwards' });
  // a plain timer, not a.finished: Chrome sometimes never sends "finished" for back-to-back animations
  return wait(ms + 20).then(() => { el.style.setProperty('--x', `${to}px`); a.cancel(); });
}

async function cubeGame() {
  cubesBox.hidden = false; void cubesBox.offsetWidth; cubesBox.classList.add('is-in');
  for (const [r, round] of CUBE_ROUNDS.entries()) {
    $('cubesRound').textContent = `Round ${r + 1} / ${CUBE_ROUNDS.length}`;
    $('cubesHint').textContent = '';
    cubesTable.innerHTML = SLOT_X.map((x, i) => `<button class="gcube${i === 1 ? ' has-ticket' : ''}" type="button" style="--x:${x}px" aria-label="Goo cube">
      <span class="gcube__ticket"></span><span class="gcube__goo"></span></button>`).join('');
    const cubes = [...cubesTable.children], prize = cubes[1];
    cubesTable.classList.add('is-locked');
    await gameSay('cubes', 'viscous', round.say);
    for (let tries = 0; ; tries++) {
      // the ticket is shown, then the goo swallows it
      prize.classList.add('is-up'); await wait(1100);
      prize.classList.remove('is-up'); await wait(650);
      // shuffle: swap two cubes at a time
      const at = [0, 1, 2]; // at[cube] = which spot it's in
      for (let s = 0; s < round.swaps; s++) {
        const a = Math.floor(Math.random() * 3), b = (a + 1 + Math.floor(Math.random() * 2)) % 3;
        await Promise.all([slide(cubes[a], SLOT_X[at[a]], SLOT_X[at[b]], round.ms, true), slide(cubes[b], SLOT_X[at[b]], SLOT_X[at[a]], round.ms, false)]);
        [at[a], at[b]] = [at[b], at[a]];
      }
      $('cubesHint').textContent = 'Which cube has the ticket?';
      cubesTable.classList.remove('is-locked');
      const picked = await new Promise((r) => cubes.forEach((c) => { c.onclick = () => r(c); }));
      cubesTable.classList.add('is-locked');
      $('cubesHint').textContent = '';
      picked.classList.add('is-up');
      if (picked === prize) {
        chime(1046.5); chime(1567.98, .12, .06);
        await wait(700);
        await gameSay('cubes', 'viscous', round.win);
        prize.classList.remove('is-up');
        break;
      }
      await wait(600);
      prize.classList.add('is-up'); // here's where it really was
      await gameSay('cubes', 'viscous', [CUBE_MISS[tries % CUBE_MISS.length]]);
      cubes.forEach((c) => c.classList.remove('is-up'));
      await wait(500);
      await gameSay('cubes', 'viscous', [['Again!']]);
    }
  }
  cubesBox.classList.remove('is-in');
  await wait(500);
  cubesBox.hidden = true;
}
// ---------- Minigame: Mo & Krill's tunnels. Three forks, three tunnels each; Maurice sniffs, Alex picks. ----------
// The right tunnel always follows the mysterious man's trail (soap, then gold, then a tidy floor).
// A wrong pick is a funny dead end, that tunnel gets crossed out, and Alex picks again.
const FORKS = [
  { say: [['Maurice is sniffing… three tunnels. Your call, friend.']], tunnels: [
    { sign: 'Smells like… soap?', right: true },
    { sign: 'Smells like wet socks', end: 'Dead end. Just Maurice\'s old socks. He\'s been looking for those.' },
    { sign: 'Smells like pizza', end: 'A rat eating a slice of pizza. Classic New York. Back we go.' },
  ] },
  { say: [['Another fork. Maurice is getting excited.'], ['I love watching Maurice do his thing…', 'love-watching']], tunnels: [
    { sign: 'Something squeaking', end: 'Rats. Hundreds of them. They are having a meeting. Let\'s not interrupt.' },
    { sign: 'A faint gold glow', right: true },
    { sign: 'Dripping water', end: 'A leaky pipe. Maurice hates getting his fur wet.' },
  ] },
  { say: [['Last fork. These people wouldn\'t last two hours in the tunnels…', 'two-hours']], tunnels: [
    { sign: 'Old bones', end: 'Bones. Nothing fancy about bones. Unless you\'re Graves.' },
    { sign: 'A sleeping rat', end: 'Shh. He\'s napping. Rem would approve.' },
    { sign: 'A neatly swept floor', right: true },
  ] },
];
const tunnelsBox = $('tunnels'), tunnelsRow = $('tunnelsRow');

async function tunnelGame() {
  tunnelsBox.hidden = false; void tunnelsBox.offsetWidth; tunnelsBox.classList.add('is-in');
  let firstMiss = true;
  for (const [f, fork] of FORKS.entries()) {
    $('tunnelsRound').textContent = `Fork ${f + 1} / ${FORKS.length}`;
    // the three tunnels come in a random order every time
    const order = [...fork.tunnels].sort(() => Math.random() - .5);
    tunnelsRow.innerHTML = order.map((t) => `<button class="tunnel" type="button"><span class="tunnel__mouth"></span><span class="tunnel__sign">${t.sign}</span></button>`).join('');
    tunnelsRow.classList.add('is-locked');
    await gameSay('tunnels', 'mokrill', fork.say);
    for (;;) {
      $('tunnelsHint').textContent = 'Which tunnel?';
      tunnelsRow.classList.remove('is-locked');
      const i = await new Promise((r) => tunnelsRow.querySelectorAll('.tunnel').forEach((b, n) => { b.onclick = () => r(n); }));
      tunnelsRow.classList.add('is-locked');
      $('tunnelsHint').textContent = '';
      const pick = order[i], btn = tunnelsRow.children[i];
      btn.classList.add('is-picked');
      if (pick.right) {
        await gameSay('tunnels', 'mokrill', [f === FORKS.length - 1 ? ['Start digging!', 'start-digging'] : ['Let\'s dig!', 'lets-dig']]);
        tunnelsBox.classList.add('is-diving'); await wait(700); tunnelsBox.classList.remove('is-diving');
        break;
      }
      btn.classList.add('is-dead');
      await gameSay('tunnels', 'mokrill', firstMiss ? [[pick.end], ['False alarm, Maurice, let\'s go back to the tunnels.', 'false-alarm']] : [[pick.end]]);
      firstMiss = false;
      btn.classList.remove('is-picked');
    }
  }
  tunnelsBox.classList.remove('is-in');
  await wait(500);
  tunnelsBox.hidden = true;
}
// ---------- Minigame: the fight with Billy. Turn based, health bars; Billy always wins with BASHDOWN on turn 3. ----------
const MOVES = [
  { name: 'Punch', hit: [12, 18], log: 'You punch Billy right in the leather jacket.' },
  { name: 'Pillow fight!', hit: [7, 11], voice: 'pillow-fight', log: 'Rem whacks Billy with his pillow. Fwump.' },
  { name: 'Pillow shield', shield: true, voice: 'pillow-safe', log: 'Rem holds up his pillow. It will block the next hit.' },
];
const BILLY_MOVES = [
  { hit: 24, voice: 'charge', log: 'Billy charges in, horns first!' },
  { hit: 28, voice: 'blasted', log: 'Billy is ENRAGED. Every hit lands harder.',
    ability: ['blasted', 'Blasted', 'Melee hits restore ammo. Bullets are amplified against wrecked enemies.'] },
  { bashdown: true, voice: 'start-shit', log: 'Billy jumps sky high and comes crashing down…',
    ability: ['bashdown', 'Bashdown', 'Slam your bat into the ground, pulling enemies down.'] },
];
// play one of the in-game clips of Billy (see-through video) over his side of the arena; resolves when it ends
function billyClip(name) {
  const v = $('fightClip');
  return new Promise((done) => {
    v.src = `assets/video/billy-${name}.webm`;
    v.onended = v.onerror = () => { fightBox.classList.remove('is-clip'); done(); };
    fightBox.classList.add('is-clip');
    v.currentTime = 0; v.play().catch(() => { fightBox.classList.remove('is-clip'); done(); });
  });
}
// the ability callout pops up, holds, and slides away
async function showAbility([icon, name, desc]) {
  $('abilityIcon').src = `assets/img/ability-${icon}.png`;
  $('abilityName').textContent = name; $('abilityDesc').textContent = desc;
  const a = $('ability');
  a.classList.remove('is-shown'); void a.offsetWidth; a.classList.add('is-shown');
  await wait(2000);
}
const fightBox = $('fight');
const bashdownSound = new Audio('assets/audio/sfx/bashdown.mp3'); // cut from the user's in-game clip
bashdownSound.volume = .55;
function hp(who, value) { $(`hp${who}`).style.width = `${Math.max(0, value)}%`; $(`hp${who}`).parentElement.dataset.hp = Math.max(0, Math.round(value)); }
function fightLog(text) { const p = $('fightLog'); p.textContent = text; p.classList.remove('is-new'); void p.offsetWidth; p.classList.add('is-new'); }
function hurt(el) { el.classList.remove('is-hit'); void el.offsetWidth; el.classList.add('is-hit'); }

async function fightGame() {
  let billy = 100, alex = 100, shield = false;
  fightBox.className = 'cubes fight'; fightBox.hidden = false; void fightBox.offsetWidth; fightBox.classList.add('is-in');
  $('fightBillyImg').src = 'assets/img/billy-head.png';
  hp('Billy', billy); hp('Alex', alex);
  $('fightMoves').innerHTML = '';
  fightLog('Billy: "You asked for this fight, buddy."');
  await speak('assets/audio/billy/asked-for-fight.mp3'); await wait(400);
  for (const [turn, bm] of BILLY_MOVES.entries()) {
    // Alex and Rem pick a move
    fightLog(turn ? 'Your turn. Billy looks angrier.' : 'Your turn!');
    $('fightMoves').innerHTML = MOVES.map((m, i) => `<button class="opt" type="button"><b>${i + 1}</b>${m.name}</button>`).join('');
    const m = await new Promise((r) => $('fightMoves').querySelectorAll('.opt').forEach((b, i) => { b.onclick = () => r(MOVES[i]); }));
    $('fightMoves').innerHTML = '';
    fightLog(m.log);
    if (m.voice) speak(`assets/audio/rem/${m.voice}.mp3`);
    if (m.hit) { billy = Math.max(35, billy - (m.hit[0] + Math.random() * (m.hit[1] - m.hit[0]))); hurt($('fightBilly')); hp('Billy', billy); } // Billy is tough: never below 35
    if (m.shield) shield = true;
    await wait(1700);
    // Billy hits back (Blasted: he gets enraged first; Bashdown: the callout before the leap)
    if (bm.ability && !bm.bashdown) fightBox.classList.add('is-enraged');
    if (bm.ability) await showAbility(bm.ability);
    fightLog(bm.log);
    const voiced = speak(`assets/audio/billy/${bm.voice}.mp3`);
    if (bm.ability && !bm.bashdown) await billyClip('blasted'); // the real Billy powering up
    if (bm.bashdown) {
      await voiced;
      // the real Billy leaps and slams; the sound and the screen shake land with the slam (about 0.8 s in)
      const clip = billyClip('bashdown');
      await wait(780);
      bashdownSound.currentTime = 0; bashdownSound.play().catch(() => {});
      fightBox.classList.add('is-bashdown');
      await clip;
      fightLog(shield ? 'BASHDOWN! The pillow did not help. At all.' : 'BASHDOWN!');
      alex = 0; hurt($('fightAlex')); hp('Alex', alex);
      await wait(1800);
    } else {
      await wait(700);
      const dmg = shield ? 4 : bm.hit;
      if (shield) fightLog(bm.log + ' The pillow blocks most of it!');
      shield = false;
      alex -= dmg; hurt($('fightAlex')); hp('Alex', alex);
      await voiced; await wait(900);
    }
  }
  $('fightBillyImg').src = 'assets/img/billy-head-gloat.png';
  fightBox.classList.add('is-ko');
  fightLog('You lose. Billy wins. And he keeps the piece.');
  await wait(2800);
  fightBox.classList.remove('is-in');
  await wait(500);
  fightBox.hidden = true;
}

// ---------- Minigame: Lash's trap. Pick the bait, then hit each of Lash's moves in time. ----------
const BAITS = [
  ['Rem pretends to nap, with the gold pieces on his pillow', 'Classic. Nobody can resist a sleeping kid with treasure.'],
  ['A big sign: "FREE PARTY. NO GOATS ALLOWED."', 'Oh, he\'s gonna HATE that. Perfect.'],
  ['Play really, really bad music', 'Bold. He\'ll come just to complain about it.'],
];
// Lash's combo (the user's order): Grapple, then Death Slam (cast 1, cast 2, launch), then Ground Strike's impact.
// sounds: [file in sfx/lash, start after ms, volume] (the game sounds have very different loudness)
const LASH_MOVES = [
  { name: 'Grapple', line: ['Whipping \'em!', 'whipping'], hit: 'is-grappled', sounds: [['grapple', 0, .7]] },
  { name: 'Death Slam', line: ['I\'m about to show you why I\'m best!', 'why-best'], hit: 'is-slammed', sounds: [['slam-cast-1', 0, .45], ['slam-cast-2', 1300, .3], ['slam-launch', 2300, .32]] },
  { name: 'Ground Strike', line: ['Let me show y\'all how it\'s done.', 'show-how'], hit: 'is-struck', sounds: [['ground-strike', 0, .34]] },
];
function lashSound([file, after, volume]) {
  setTimeout(() => { const a = new Audio(`assets/audio/sfx/lash/${file}.mp3`); a.volume = volume; a.play().catch(() => {}); }, after);
}
const trapBox = $('trap');

async function trapGame() {
  trapBox.className = 'cubes trap'; trapBox.hidden = false; void trapBox.offsetWidth; trapBox.classList.add('is-in');
  $('trapStage').innerHTML = '';
  await gameSay('trap', 'lash', [['Alright, bait. What\'s the plan?']]);
  $('trapStage').innerHTML = `<div class="opts">${BAITS.map(([b], i) => `<button class="opt" type="button"><b>${i + 1}</b>${b}</button>`).join('')}</div>`;
  const bait = await new Promise((r) => $('trapStage').querySelectorAll('.opt').forEach((b, i) => { b.onclick = () => r(BAITS[i]); }));
  $('trapStage').innerHTML = '';
  await gameSay('trap', 'lash', [[bait[1]], ['Now hide. And when I say go… you hit the button.']]);
  // Billy walks right into it
  $('trapStage').innerHTML = '<img class="trap__billy" id="trapBilly" src="assets/img/billy-head.png" alt="Billy">';
  trapBox.classList.add('has-billy');
  await speak('assets/audio/billy/rigged.mp3');
  // and then Lash comes out of nowhere
  $('trapStage').insertAdjacentHTML('beforeend', `<img class="trap__lash" src="${HERO.lash.img}" alt="Lash">`);
  await gameSay('trap', 'lash', [['Here comes The Lash!', 'here-comes']]);
  await speak('assets/audio/billy/what.mp3');
  await wait(300);
  for (const move of LASH_MOVES) {
    await gameSay('trap', 'lash', [[`${move.name.toUpperCase()}! NOW!`]]);
    for (;;) {
      // the button pops up somewhere and its ring shrinks; click before it's gone
      const x = 20 + Math.random() * 60, y = 25 + Math.random() * 40;
      $('trapStage').insertAdjacentHTML('beforeend', `<button class="qte" type="button" style="left:${x}%;top:${y}%"><span>${move.name}</span></button>`);
      const btn = $('trapStage').querySelector('.qte');
      const hit = await Promise.race([new Promise((r) => { btn.onclick = () => r(true); }), wait(2200).then(() => false)]);
      btn.remove();
      if (hit) break;
      await gameSay('trap', 'lash', [['Too slow! Again!']]);
    }
    move.sounds.forEach(lashSound);
    const billy = $('trapBilly');
    billy.classList.remove('is-hit', 'is-grappled', 'is-slammed', 'is-struck'); void billy.offsetWidth; billy.classList.add(move.hit);
    if (move.hit === 'is-struck') { trapBox.classList.remove('is-quaking'); void trapBox.offsetWidth; trapBox.classList.add('is-quaking'); }
    await wait(move.name === 'Death Slam' ? 2600 : 600); // let the slam's cast and launch play out
    await gameSay('trap', 'lash', [move.line]);
    if (move.name === 'Grapple') await speak('assets/audio/billy/aint-got.mp3'); // Billy, still talking big
  }
  trapBox.classList.add('is-won');
  await wait(900);
  await gameSay('trap', 'lash', [['And THAT\'S why they call me champ.']]);
  trapBox.classList.remove('is-in');
  await wait(500);
  trapBox.hidden = true;
}
// ---------- The Broker's shop: the cursed ticket card, Buy or Walk away ----------
let boughtCurse = false, bitten = -1; // bitten = the ticket piece Phoebe chewed (keeps its bite mark)

// buying is required: "Walk away" only gets Rem refusing to leave, and the card comes back
async function shopGame() {
  const box = $('curse');
  for (;;) {
    box.hidden = false; void box.offsetWidth; box.classList.add('is-in');
    const buy = await new Promise((r) => { $('curseBuy').onclick = () => r(true); $('curseLeave').onclick = () => r(false); });
    box.classList.remove('is-in');
    await wait(400);
    box.hidden = true;
    if (buy) break;
    await run(BROKER_PASS);
  }
  boughtCurse = true;
  await run(BROKER_BUY);
}

// Phoebe trots in, pounces on the ticket holder and bites a piece
async function phoebeBite() {
  const cat = $('phoebe'), pieces = [...holder.querySelectorAll('.piece')];
  if (!pieces.length) return;
  const piece = pieces[Math.floor(Math.random() * pieces.length)];
  const r = piece.getBoundingClientRect();
  bitten = +piece.dataset.slot;
  cat.style.setProperty('--tx', `${r.left + r.width * .2}px`);
  cat.hidden = false; void cat.offsetWidth; cat.classList.add('is-pouncing');
  await wait(1300);
  tearSound.currentTime = 0; tearSound.play().catch(() => {});
  piece.classList.add('is-bitten');
  piece.style.setProperty('--bx', `${(slotX[bitten] + slotX[bitten + 1]) / 2}px`);
  await wait(900);
  cat.classList.add('is-leaving');
  await wait(900);
  cat.hidden = true; cat.className = 'phoebe';
}

// walking up to the shop: the dark street, "Psst…", the logo, the shop rising; a click goes in
async function brokerVisit() {
  const a = $('brokerArrive');
  music('brokerApproach');
  show(null);
  a.hidden = false; void a.offsetWidth; a.classList.add('is-in');
  for (const el of a.querySelectorAll('[data-step]')) { await wait(1200); el.classList.add('is-in'); }
  await wait(600);
  a.classList.add('is-done');
  await new Promise((r) => a.addEventListener('click', r, { once: true }));
  a.classList.remove('is-in');
  await wait(600);
  a.hidden = true; a.className = 'bk'; a.querySelectorAll('[data-step]').forEach((el) => el.classList.remove('is-in'));
  await meet({ ...BROKER });
}
const GAMES = { cubes: cubeGame, tunnels: tunnelGame, fight: fightGame, trap: trapGame, shop: shopGame };

// ---------- The torn ticket: one word per piece ("\n" breaks a line); the birthday only shows in the last piece ----------
const TICKET = ['Admit', 'One', 'Tonight', 'At the', 'Baroness', 'Guest', 'Alex', 'Happy\nbirthday'];
// the order the pieces are found in (by number above): AT THE and BARONESS come last, so for most of the game
// the ticket reads "ADMIT ONE TONIGHT ▢ ▢ GUEST ALEX" and the place is the final reveal that opens Midtown
const FOUND_ORDER = [0, 1, 2, 5, 6, 3, 4, 7];
const holder = $('holder'), gift = $('gift');
let collected = 0, slotW = [], slotX = [0], seams = [];

// each piece is as wide as its word; the torn seams are shared by neighbours so the pieces fit exactly
function cutTicket() {
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = '46px Pulp';
  slotW = TICKET.map((w, i) => Math.max(...w.toUpperCase().split('\n').map((l) => measure.measureText(l).width * 1.06)) + 64 + (i === 0 || i === TICKET.length - 1 ? 70 : 0));
  slotX = [0]; slotW.forEach((w) => slotX.push(slotX.at(-1) + w));
  const width = slotX.at(-1);
  document.documentElement.style.setProperty('--tk-w', width + 'px');
  document.documentElement.style.setProperty('--holder-scale', Math.min(.35, 660 / width));
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  seams = slotX.map((x, i) => {
    if (i === 0 || i === slotX.length - 1) return [[x, 0], [x, 300]];
    const pts = [];
    for (let y = 0; y <= 300; y += 11) pts.push([x + (rnd() - .5) * 22 + Math.sin(y / 23 + i) * 6, y]);
    return pts;
  });
}
document.fonts.load('46px Pulp').then(cutTicket);
cutTicket();

const ticketHTML = () => `<div class="tk"><div class="tk__face">
    <span class="tk__frame"></span>
    <span class="tk__fan tk__fan--tl"></span><span class="tk__fan tk__fan--tr"></span><span class="tk__fan tk__fan--bl"></span><span class="tk__fan tk__fan--br"></span>
    <span class="tk__perf tk__perf--t"></span><span class="tk__perf tk__perf--b"></span>
    <div class="tk__words">${TICKET.map((w, i) => `<div class="tk__slot" style="width:${slotW[i]}px"><span class="tk__word">${w.replace('\n', '<br>')}</span><span class="tk__no">No. ${i + 1}</span></div>`).join('')}</div>
  </div></div>`;
function pieceHTML(i) {
  const pts = [...seams[i], ...[...seams[i + 1]].reverse()].map(([x, y]) => `${x.toFixed(1)}px ${y}px`).join(', ');
  const bite = i === bitten ? ` is-bitten" style="--bx:${(slotX[i] + slotX[i + 1]) / 2}px;` : '" style="'; // Phoebe's bite stays
  return `<div class="piece${bite}--cut:polygon(${pts})" data-slot="${i}">${ticketHTML()}</div>`;
}

// how many pieces are in the holder right now (one may be stolen)
let stolen = -1;
const have = () => holder.querySelectorAll('.piece').length;
const countLabel = () => { $('holderLabel').textContent = `Torn ticket pieces: ${have()} / ${TICKET.length}`; };

// Billy rips Rem's piece (the first one) out of the holder
async function stealPiece() {
  const p = holder.querySelector('.piece[data-slot="0"]');
  if (!p) return;
  stolen = 0;
  await wait(400);
  p.classList.add('is-stolen');
  tearSound.currentTime = 0; tearSound.play().catch(() => {});
  $('holderLabel').textContent = `${HERO.billy.name} stole a torn ticket piece!`;
  holder.classList.add('is-robbed');
  await wait(2600);
  p.remove(); holder.classList.remove('is-robbed');
  countLabel();
}

// a piece flutters in big with a rip, "Take it" drops it into the holder at the bottom
// (the next new piece, or a given one, like the piece Billy stole)
const tearSound = new Audio('assets/audio/sfx/tear-e.mp3');
tearSound.volume = .5;
async function givePiece(i = FOUND_ORDER[collected], title = 'You got a torn ticket piece') {
  const mid = (slotX[i] + slotX[i + 1]) / 2, piece = $('giftPiece');
  gift.querySelector('.gift__title').textContent = title;
  piece.innerHTML = pieceHTML(i);
  piece.style.setProperty('--shift', `${-mid}px`);
  piece.style.transformOrigin = `${mid}px 50%`; // grow and spin around the piece itself
  gift.className = 'gift'; gift.hidden = false; void gift.offsetWidth; gift.classList.add('is-in');
  await wait(250);
  tearSound.currentTime = 0; tearSound.play().catch(() => {});
  await new Promise((r) => $('take').addEventListener('click', r, { once: true }));
  gift.classList.add('is-out');
  await wait(550);
  gift.hidden = true;
  holder.hidden = false;
  holder.insertAdjacentHTML('beforeend', pieceHTML(i));
  if (i === stolen) stolen = -1; else collected++;
  countLabel();
  await wait(900);
}

// typewriter keys and the bell at the end of a line, made in the browser
let sfxCtx;
function noiseBurst(seconds, shape) {
  const a = (sfxCtx ||= new AudioContext()), buf = a.createBuffer(1, a.sampleRate * seconds, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * shape(i / d.length);
  const src = a.createBufferSource(); src.buffer = buf; return src;
}
function typeKey() {
  const a = (sfxCtx ||= new AudioContext()), now = a.currentTime;
  const src = noiseBurst(.04, (t) => (1 - t) ** 3);
  const hp = a.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800 + Math.random() * 900;
  const g = a.createGain(); g.gain.value = .22;
  src.connect(hp).connect(g).connect(a.destination); src.start(now);
  const o = a.createOscillator(), og = a.createGain(); // the "clack" body
  o.frequency.value = 160 + Math.random() * 40;
  og.gain.setValueAtTime(.12, now); og.gain.exponentialRampToValueAtTime(.001, now + .05);
  o.connect(og).connect(a.destination); o.start(now); o.stop(now + .06);
}
function typeBell() {
  const a = (sfxCtx ||= new AudioContext()), now = a.currentTime;
  [2093, 3136].forEach((f, i) => {
    const o = a.createOscillator(), g = a.createGain(); o.frequency.value = f;
    g.gain.setValueAtTime(i ? .03 : .07, now); g.gain.exponentialRampToValueAtTime(.0005, now + .9);
    o.connect(g).connect(a.destination); o.start(now); o.stop(now + 1);
  });
}

// magic for the golden ticket: a long, soft echo that every chime rings into
let hallReverb;
function reverb() {
  const a = (sfxCtx ||= new AudioContext());
  if (hallReverb) return hallReverb;
  const len = a.sampleRate * 4, buf = a.createBuffer(2, len, a.sampleRate);
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3; }
  hallReverb = a.createConvolver(); hallReverb.buffer = buf;
  const wet = a.createGain(); wet.gain.value = .9;
  hallReverb.connect(wet).connect(a.destination);
  return hallReverb;
}
// one shimmering chime (a bell-like tone with a slightly detuned twin)
function chime(freq, at = 0, level = .09, ring = 2.2) {
  const a = (sfxCtx ||= new AudioContext()), now = a.currentTime + at;
  [[1, 'sine', 1], [2.01, 'sine', .35], [3.98, 'triangle', .12], [1.004, 'sine', .6]].forEach(([mult, type, part]) => {
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.value = freq * mult;
    g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(level * part, now + .015);
    g.gain.exponentialRampToValueAtTime(.0001, now + ring / mult ** .5);
    o.connect(g); g.connect(a.destination); g.connect(reverb());
    o.start(now); o.stop(now + ring + .2);
  });
}
// New York jazz for the golden ticket. A vibraphone: soft mallet tone with the slow wobble of its spinning fans
function vibes(freq, at = 0, level = .11) {
  const a = (sfxCtx ||= new AudioContext()), now = a.currentTime + at;
  const out = a.createGain(); out.gain.value = 1;
  const trem = a.createOscillator(), depth = a.createGain(); trem.frequency.value = 5.2; depth.gain.value = .35; // the wobble
  trem.connect(depth).connect(out.gain); trem.start(now); trem.stop(now + 2.6);
  [[1, level], [4, level * .12], [10, level * .03]].forEach(([mult, lv]) => { // a metal bar: the note, then thin bright overtones
    const o = a.createOscillator(), g = a.createGain(); o.frequency.value = freq * mult;
    g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(lv, now + .008); g.gain.exponentialRampToValueAtTime(.0001, now + 2.4 / mult ** .7);
    o.connect(g).connect(out); o.start(now); o.stop(now + 2.6);
  });
  out.connect(a.destination); out.connect(reverb());
}
// each piece that lights up plays the next note of a C6/9 chord, climbing (a club-lounge sound)
const JAZZ_NOTES = [261.63, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99];
function pieceChime(i) { vibes(JAZZ_NOTES[i % JAZZ_NOTES.length]); }
// a cymbal: a hiss that swells or crashes
function cymbal(at, swell, length) {
  const a = (sfxCtx ||= new AudioContext()), now = a.currentTime + at;
  const src = noiseBurst(length, (t) => (swell ? t ** 2 : (1 - t) ** 2));
  const hp = a.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5500;
  const g = a.createGain(); g.gain.value = .13;
  src.connect(hp).connect(g); g.connect(a.destination); g.connect(reverb()); src.start(now);
}
// the whole ticket complete: a big-band "ta-da!" (cymbal swell, then a brass section hit on a rich jazz chord,
// an upright bass note underneath, a vibraphone sparkle on top)
function magicSwell() {
  const a = (sfxCtx ||= new AudioContext()), now = a.currentTime, hit = now + .55;
  cymbal(0, true, .55);           // tssssss…
  cymbal(.55, false, 2.6);        // …CRASH
  // brass: bright buzzy tones whose filter snaps open ("bwah!") and settles, with a late vibrato
  const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 2;
  lp.frequency.setValueAtTime(400, hit); lp.frequency.linearRampToValueAtTime(3400, hit + .06); lp.frequency.exponentialRampToValueAtTime(1400, hit + .5);
  const bus = a.createGain();
  bus.gain.setValueAtTime(0, hit); bus.gain.linearRampToValueAtTime(.2, hit + .04); bus.gain.setValueAtTime(.16, hit + .3);
  bus.gain.linearRampToValueAtTime(.14, hit + 1.7); bus.gain.exponentialRampToValueAtTime(.0001, hit + 3.2);
  lp.connect(bus); bus.connect(a.destination); bus.connect(reverb());
  const vib = a.createOscillator(), vibDepth = a.createGain(); vib.frequency.value = 5.5;
  vibDepth.gain.setValueAtTime(0, hit); vibDepth.gain.linearRampToValueAtTime(14, hit + 1.2); vib.connect(vibDepth); vib.start(hit); vib.stop(hit + 3.3);
  [130.81, 196, 293.66, 329.63, 440, 587.33, 659.25].forEach((f, n) => [-7, 7].forEach((cents) => { // C6/9, spread like a horn section
    const o = a.createOscillator(); o.type = n < 2 ? 'sawtooth' : 'square'; o.frequency.value = f; o.detune.value = cents;
    vibDepth.connect(o.detune);
    const g = a.createGain(); g.gain.value = n < 2 ? .05 : .03;
    o.connect(g).connect(lp); o.start(hit); o.stop(hit + 3.3);
  }));
  // upright bass: a deep plucked C
  const b = a.createOscillator(), bg = a.createGain(); b.type = 'triangle'; b.frequency.value = 65.41;
  bg.gain.setValueAtTime(0, hit); bg.gain.linearRampToValueAtTime(.35, hit + .015); bg.gain.exponentialRampToValueAtTime(.0001, hit + 1.6);
  b.connect(bg).connect(a.destination); b.start(hit); b.stop(hit + 1.7);
  // vibraphone sparkle on top, after the hit
  [1046.5, 1318.51, 1567.98, 1760, 2093].forEach((f, i) => vibes(f, .9 + i * .11, .06));
}

// a soft card "fwip" when a card turns over
function flipSound() {
  const a = (sfxCtx ||= new AudioContext()), now = a.currentTime;
  const src = noiseBurst(.16, (t) => Math.sin(Math.PI * t) ** 2);
  const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.2;
  bp.frequency.setValueAtTime(900, now); bp.frequency.exponentialRampToValueAtTime(3200, now + .16);
  const g = a.createGain(); g.gain.value = .35;
  src.connect(bp).connect(g).connect(a.destination); src.start(now);
}

// the music goes quiet and the objective types itself out
async function objective(lines) {
  const box = $('objective');
  box.classList.remove('is-done'); box.hidden = false;
  if (track) fade(track, .015, 900);
  await wait(1000);
  for (const [n, text] of lines.entries()) {
    for (const ch of spell($(`obj${n + 1}`), text)) {
      ch.classList.add('is-in');
      const letter = ch.textContent.trim();
      if (letter) typeKey();
      await wait(letter ? 70 + Math.random() * 40 : 120);
    }
    typeBell();
    await wait(700);
  }
  box.classList.add('is-done');
  await new Promise((r) => $('objGo').addEventListener('click', r, { once: true }));
  box.hidden = true;
  if (track) fade(track, MUSIC_VOLUME, 1500);
}

// ---------- The conversation ----------
const voice = new Audio();
voice.volume = .35; // voice lines: 0 = silent, 1 = full blast (music is at .1)
// pacing, so the talk never rushes (all in milliseconds)
const LETTER = 35;       // per letter while a line types out
const LINGER = 800;      // after a hero's line finishes, before "click to continue" shows up
const ALEX_PAUSE = 1100; // after Alex says something, before the next line
const THINK = 600;       // before Alex's answers appear
let advance = null;

// one message in the chat: a hero on the left, Alex on the right
function bubble(who, thought) {
  const el = document.createElement('div');
  if (who === 'alex') {
    el.className = 'msg msg--alex' + (thought ? ' msg--thought' : '');
    el.innerHTML = `<div class="say"><span class="say__who">Alex</span><p></p><span class="say__more"></span></div>
      <div class="face face--alex" role="img" aria-label="Alex"></div>`;
  } else {
    const h = HERO[who];
    el.className = 'msg';
    el.style.setProperty('--art', `url("${h.art}")`);
    el.innerHTML = `<div class="face face--hero" style="background-image:url('${h.head}')" role="img" aria-label="${h.name}"></div>
      <div class="say"><img class="say__name" src="${h.nameImg}" alt="${h.name}"><p></p><span class="say__more"></span></div>`;
  }
  chat.append(el);
  return el;
}

// play a voice line and resolve when it ends (or straight away if it can't play)
function speak(file) {
  return new Promise((done) => {
    voice.src = file;
    voice.onended = voice.onerror = done;
    voice.play().catch(done);
  });
}

// someone says a line: their face rocks while the words type out and their voice plays
async function line(step) {
  const who = 'alex' in step ? 'alex' : Object.keys(step).find((k) => HERO[k]);
  const text = step[who];
  const el = bubble(who, step.thought);
  const p = el.querySelector('p');
  el.classList.add('is-talking');
  const voiced = step.voice ? speak(`assets/audio/${who}/${step.voice}.mp3`) : Promise.resolve();
  for (let i = 1; i <= text.length; i++) { p.textContent = text.slice(0, i); await wait(LETTER); }
  p.textContent = text;
  await voiced;
  el.classList.remove('is-talking');

  if (who === 'alex') return wait(ALEX_PAUSE);
  // heroes let the line sit for a moment, then wait for a click before the next one
  await wait(LINGER);
  const more = el.querySelector('.say__more');
  more.textContent = 'click to continue';
  await new Promise((r) => { advance = r; });
  advance = null;
  more.textContent = '';
}

// Drifter's ultimate: the screen goes black, the music fades away, the whistle plays from the dark,
// then two red eyes open and the lights come back
async function darkness({ sound, text }) {
  const b = $('blackout');
  $('blackoutText').textContent = text || '';
  if (track) fade(track, .01, 1000);
  b.hidden = false; void b.offsetWidth; b.classList.add('is-in');
  await wait(1300);
  const s = new Audio(`assets/audio/sfx/${sound}.mp3`); s.volume = .7;
  b.classList.add('is-whistling');
  await new Promise((r) => { s.onended = s.onerror = r; s.play().catch(r); });
  b.classList.add('is-eyes');
  await wait(1100);
  b.classList.remove('is-in');
  await wait(1200);
  b.hidden = true; b.className = 'blackout';
  if (track) fade(track, MUSIC_VOLUME, 1500);
}

// story text in the middle of the chat (no face, no bubble), typed out, then a click moves on
async function narrate(text) {
  const el = document.createElement('div');
  el.className = 'msg msg--narr';
  el.innerHTML = '<p></p><span class="say__more"></span>';
  chat.append(el);
  const p = el.querySelector('p');
  for (let i = 1; i <= text.length; i++) { p.textContent = text.slice(0, i); await wait(LETTER); }
  p.textContent = text;
  await wait(LINGER);
  el.querySelector('.say__more').textContent = 'click to continue';
  await new Promise((r) => { advance = r; });
  advance = null;
  el.querySelector('.say__more').textContent = '';
}

// Alex picks an answer; it's said as his line, then whatever follows that answer plays
async function choose(choices) {
  await wait(THINK);
  const el = document.createElement('div');
  el.className = 'msg msg--alex';
  el.innerHTML = `<div class="opts">${choices.map((c, i) => `<button class="opt" type="button"><b>${i + 1}</b>${c.alex}</button>`).join('')}</div>
    <div class="face face--alex" role="img" aria-label="Alex"></div>`;
  chat.append(el);
  const picked = await new Promise((r) => el.querySelectorAll('.opt').forEach((b, i) => b.addEventListener('click', () => r(choices[i]))));
  el.remove();
  await line({ alex: picked.alex, voice: picked.voice });
  if (picked.then) await run(picked.then);
}

async function run(steps) {
  for (const step of steps) {
    if (step.wait) await wait(step.wait * 1000);                                // a quiet pause, in seconds
    else if (step.untilSong) await untilSong(step.untilSong);                   // hold until the song has played this far
    else if (step.game) await GAMES[step.game]();
    else if (step.steal) await stealPiece();                                    // Billy rips Rem's piece out of the holder
    else if (step.narrate) await narrate(step.narrate);                         // story text, no speaker
    else if (step.dark) await darkness(step.dark);                              // Drifter's ultimate: black, whistling, red eyes
    else if (step.give) await givePiece(undefined, step.give);                  // the next piece, mid-talk (the Doorman's)
    else if (step.assemble) await assembleTicket();                             // the whole ticket, lit up
    else if (step.phoebe) await phoebeBite();                                   // the Broker's curse: Phoebe eats paper
    else if (step.asleep) { $('cardSleepImg').src = HERO.rem.sleepImg; card.classList.add('is-sleepy'); await wait(1500); }
    else if (step.appear) { guest.classList.remove('is-hiding'); await wait(900); } // the card drops in
    else await (step.choose ? choose(step.choose) : line(step));
  }
}

// a click on the chat or the card moves on to the next line (only once "click to continue" shows; no rushing)
guest.addEventListener('click', (e) => {
  if (e.target.closest('.opt') || card.classList.contains('is-sleepy')) return;
  if (advance) advance();
});

// ---------- Music: one song per place, crossfading when the place changes ----------
const MUSIC = {
  theme: 'assets/audio/music/main-theme.mp3', // Deadlock main menu theme: the intro, the paper, the walk
  sleeping: 'assets/audio/music/sleeping.mp3', // Rem's Hideout theme: while Rem sleeps
  talk: 'assets/audio/music/talk.mp3',         // Teleporter music: every conversation
  brokerApproach: 'assets/audio/music/broker-approach.mp3', // a mysterious Teleporter track: walking up to the Broker
  brokerShop: 'assets/audio/music/broker-shop.mp3',         // The Curiosity Shop ("Secret Shop" theme): shopping at the Broker's
  baroness: 'assets/audio/music/baroness.mp3',              // Baroness Hotel music: the Doorman and the party
};
const MUSIC_VOLUME = .1; // 0 = silent, 1 = full blast
const soundHint = $('soundHint');
let track = null;

// slide a song's volume; runs on a clock (not screen redraws, which pause in background tabs),
// and a new fade on the same song replaces the old one instead of fighting it
function fade(audio, to, ms, done) {
  clearInterval(audio.fading);
  const from = audio.volume, start = performance.now();
  audio.fading = setInterval(() => {
    const t = Math.min(1, (performance.now() - start) / ms);
    audio.volume = from + (to - from) * t;
    if (t >= 1) { clearInterval(audio.fading); if (done) done(); }
  }, 30);
}

// switch to a song: the old one fades out while the new one fades in
function music(name) {
  if (track && track.dataset.name === name) return;
  const old = track;
  if (old) fade(old, 0, 1500, () => old.pause());
  track = new Audio(MUSIC[name]);
  track.dataset.name = name;
  track.loop = true;
  track.volume = 0;
  startTrack();
}

function startTrack() {
  if (!track) return;
  track.play().then(() => { soundHint.hidden = true; fade(track, MUSIC_VOLUME, 2500); })
    .catch(() => { soundHint.hidden = false; }); // the browser wants a click first
}
// browsers only allow sound after the first click or key press, so start then if it was held back
['pointerdown', 'keydown'].forEach((ev) => addEventListener(ev, () => { if (track && track.paused) startTrack(); }));

// wait until the current song has played this many seconds (or that much time passed, if it isn't playing)
function untilSong(seconds) {
  const start = performance.now();
  return new Promise((done) => {
    const check = () => {
      const heard = track && !track.paused ? track.currentTime : (performance.now() - start) / 1000;
      if (heard >= seconds) done(); else setTimeout(check, 250);
    };
    check();
  });
}

// ---------- Intro: the message writes itself out, then the button slams in ----------
async function introduce() {
  const letters = [...intro.querySelectorAll('[data-type]')].map((el) => spell(el, el.textContent));
  const beats = [[180, 900], [38, 1100]]; // [ms per letter, pause after the line]
  await wait(600);
  for (const [i, chars] of letters.entries()) {
    for (const ch of chars) { ch.classList.add('is-in'); if (!still) await wait(beats[i][0]); }
    await wait(still ? 0 : beats[i][1]);
  }
  $('cta').classList.add('is-born');
  intro.classList.add('is-shaking');
}

// ---------- Wiring ----------
// the first click (the start screen) is what lets the browser play sound, so the music starts with it
function enter(e) {
  if (!gate.classList.contains('is-active')) return;
  const s = saved();
  if (s) { // a story in progress: only the two buttons count
    const pick = e?.target.closest?.('[data-resume]');
    if (!pick) return;
    if (pick.dataset.resume === 'yes') { music('theme'); resume(s); return; }
    forget();
  }
  music('theme');
  show(intro);
  introduce();
}
gate.addEventListener('click', enter);
gate.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); } });
$('start').addEventListener('click', () => story());

// ---------- Backgrounds: the city cycles through its districts ----------
const BACKGROUNDS = ['olive', 'spirit', 'broadway', 'chinatown', 'noir', 'uptown', 'park'];
const HOLD = 9000; // ms each background stays before the next fades in

const city = document.querySelector('.city');
const layers = BACKGROUNDS.map((name, i) => {
  const layer = i ? city.cloneNode(true) : city;
  layer.dataset.bg = name;
  if (i) city.parentNode.insertBefore(layer, city.nextSibling);
  return layer;
});
let current = 0;
layers[0].classList.add('is-on');

setInterval(() => {
  const prev = layers[current];
  current = (current + 1) % layers.length;
  const next = layers[current];
  // the new one fades in over the old, so the city never dips to black mid-fade
  layers.forEach((l) => { l.style.zIndex = l === next ? 2 : l === prev ? 1 : 0; });
  next.classList.add('is-on');
  prev.classList.add('is-leaving');
  setTimeout(() => prev.classList.remove('is-on', 'is-leaving'), 2100);
}, HOLD);

// a story in progress (saved in this browser): the first screen offers to continue it
if (saved()?.met?.length) { $('gateResume').hidden = false; $('gateCta').hidden = true; }

// card leans toward the mouse
card.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  card.style.setProperty('--ry', `${x * 16}deg`);
  card.style.setProperty('--rx', `${y * -16}deg`);
});
card.addEventListener('mouseleave', () => {
  card.style.setProperty('--rx', '0deg');
  card.style.setProperty('--ry', '0deg');
});
