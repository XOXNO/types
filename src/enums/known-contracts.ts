export enum ContractTypes {
  STAKING = 'staking',
  MARKETPLACE = 'marketplace',
  LENDING = 'lending',
  BURN = 'burn',
  P2P = 'p2p',
  LOTTERY = 'lottery',
  PRIVATE_SALE = 'privateSale',
  LAUNCHPAD = 'launchpad',
  EXCHANGE = 'exchange',
  LIQUID_STAKING = 'liquidStaking',
  AIRDROP = 'airdrop',
  ACCUMULATOR = 'accumulator',
}

const profile =
  'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgq6wegs2xkypfpync8mn2sa5cmpqjlvrhwz5nqgepyg8/icon.svg';

export const KNOWN_CONTRACTS_MAP: Map<
  string,
  {
    name: string;
    type: ContractTypes;
    profile: string;
  }
> = new Map([
  [
    'erd1qqqqqqqqqqqqqpgqrq6gv0ljf4y9md42pe4m6mh96hcpqnpuusls97tf33',
    {
      name: 'OneDex Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgq8nlmvjm8gum6y2kqe0v296kgu8cm4jlemvlsays3ku/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqwp73w2a9eyzs64eltupuz3y3hv798vlv899qrjnflg',
    {
      name: 'OnionX',
      type: ContractTypes.MARKETPLACE,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqwp73w2a9eyzs64eltupuz3y3hv798vlv899qrjnflg/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6',
    {
      name: 'xKing Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqpxqgzyuyna7kmxh5hf9fmsur4m3lt37udn3qs3rhqg',
    {
      name: 'OddApes Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqpxqgzyuyna7kmxh5hf9fmsur4m3lt37udn3qs3rhqg/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq684slltwj7at6ylurjfsmvwy3j748qy9kdjs4m742l',
    {
      name: 'Drifters Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/DRIFTERS-efd96c/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqfken0exk7jpr85dx6f8ym3jgcagesfcqkqys0xnquf',
    {
      name: 'ArtCPAclub Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://artcpaclub.com/static/media/logo.64531eb67432280f1771.png',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq0smwhv42vn4xqwphwhzrsdrn8xpfur2ldn3qpuhmns',
    {
      name: 'xKing Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgquk2g3w3k75673rvxk3dn3h439uw6tyw32xuqfgul5g',
    {
      name: 'QoWatt Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgquk2g3w3k75673rvxk3dn3h439uw6tyw32xuqfgul5g/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq9l2rc6wx6929npnn079z7tst4u5zlmaylzmsqt5n3h',
    {
      name: 'MultiFights Staking',
      type: ContractTypes.STAKING,
      profile: 'https://www.multi-fights.com/icons/logo.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq8nlmvjm8gum6y2kqe0v296kgu8cm4jlemvlsays3ku',
    {
      name: 'OneDex Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgq8nlmvjm8gum6y2kqe0v296kgu8cm4jlemvlsays3ku/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqux55qfs5wzsec7tfuep70tzq8pq75t634wuqcew4vp',
    {
      name: 'OneDex Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgq8nlmvjm8gum6y2kqe0v296kgu8cm4jlemvlsays3ku/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqe98h78xksheffcy2n3nwmdj5hfsmlvkxdn3qlttq96',
    {
      name: 'Trio Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqe98h78xksheffcy2n3nwmdj5hfsmlvkxdn3qlttq96/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqadwtwhngann2zjze7su9vhuw7297j7pwdn3qgp49dj',
    {
      name: 'xKing Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq88faj957nkqmwx9429ycsaa3cr88rkgjdn3qx4hrpz',
    {
      name: 'OddApes Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqpxqgzyuyna7kmxh5hf9fmsur4m3lt37udn3qs3rhqg/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqzq00z9eq8ar5zytllr22ryha4mhe2mujdn3quya9sa',
    {
      name: 'xWomen Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq634wcv59j0pn6fn6629wu7m30p7xagmwdn3qyjcfgl',
    {
      name: 'xKing Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq38grrdsm7pepaz9e7e4cymcwxr4unaf5dn3qtzcvry',
    {
      name: 'xPirates Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq9wrcwqsg8ftevjkkans8tvs9qd6nghhcdn3qmckng3',
    {
      name: 'xAliens Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqtdd94z0ds3rthlwmndwr7zfj3j3ptrtsdn3q7fu2p6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqyyfevpc7p9fjt3eaaumyz5cqxhvle0d4dn3qhaj2mh',
    {
      name: 'OddApes Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqpxqgzyuyna7kmxh5hf9fmsur4m3lt37udn3qs3rhqg/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgquysvl440cpkhcuyaf3swufh3dnka0r2y9neset2l2s',
    {
      name: 'Demiourgos Staking',
      type: ContractTypes.STAKING,
      profile: 'https://vestax.finance/images/vesta_snake.png',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq8dw369n8e44l4ka4x8kxqkrlpfk5m2fkx0kq2mf573',
    {
      name: 'Giants Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgq8dw369n8e44l4ka4x8kxqkrlpfk5m2fkx0kq2mf573/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqqpkj0zy6qu3f20egpjv5py0lag5jyray7cnswsgxef',
    {
      name: 'FlipiX',
      type: ContractTypes.MARKETPLACE,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqqpkj0zy6qu3f20egpjv5py0lag5jyray7cnswsgxef/icon.svg',
    },
  ],
  [
    'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag',
    {
      name: 'Burn Wallet',
      type: ContractTypes.BURN,
      profile:
        'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f525.png',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq6wegs2xkypfpync8mn2sa5cmpqjlvrhwz5nqgepyg8',
    {
      name: 'XOXNO Marketplace',
      type: ContractTypes.MARKETPLACE,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqd9rvv2n378e27jcts8vfwynpx0gfl5ufz6hqhfy0u0',
    {
      name: 'Deadrare',
      type: ContractTypes.MARKETPLACE,
      profile: 'https://deadrare.io/_next/image?url=%2Ffavicon.png&w=3840&q=75',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq705fxpfrjne0tl3ece0rrspykq88mynn4kxs2cg43s',
    {
      name: 'FrameIt',
      type: ContractTypes.MARKETPLACE,
      profile:
        'https://ugc.production.linktr.ee/nClBxVdkTnifwLwZle8B_gsefZib194jU0G6b?io=true&size=avatar-v3_0',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq8xwzu82v8ex3h4ayl5lsvxqxnhecpwyvwe0sf2qj4e',
    {
      name: 'Krogran',
      type: ContractTypes.MARKETPLACE,
      profile:
        'https://miro.medium.com/v2/resize:fit:2400/1*_A3ZhnCP7aqerPgGQl3cng.png',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqvegsel8c794v8jzqfdmms0q7tpfxt9dwuyasxu840v',
    {
      name: 'Eneftor',
      type: ContractTypes.MARKETPLACE,
      profile:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5YvUYG52dv0u5VrsiMRDa1m189F7bgcJgw&s',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqz2tgn80j5p5hqh4hx69uc27gz0drcjmmg20skf0wru',
    {
      name: 'NFTR',
      type: ContractTypes.MARKETPLACE,
      profile:
        'https://pbs.twimg.com/profile_images/1540365326403117058/kxufEdRt_400x400.jpg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq47y8hnct68v6asjv6gxem6h9rumn9frzah0skhxxt6',
    {
      name: 'XOXNO P2P',
      type: ContractTypes.P2P,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqqgzzsl0re9e3u0t3mhv3jwg6zu63zssd7yqs3uu9jk',
    {
      name: 'CowCow Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/COW-cd463d/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqra34kjj9zu6jvdldag72dyknnrh2ts9aj0wqp4acqh',
    {
      name: 'xSpotlight',
      type: ContractTypes.MARKETPLACE,
      profile:
        'https://pbs.twimg.com/profile_images/1614974732993961987/KlkNtoSY_400x400.jpg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqx00c5udg9uql5sgk5vswfr8cp7kalqgcyawq9xpw26',
    {
      name: 'Frameit Lottery',
      type: ContractTypes.LOTTERY,
      profile:
        'https://ugc.production.linktr.ee/nClBxVdkTnifwLwZle8B_gsefZib194jU0G6b?io=true&size=avatar-v3_0',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqehfk86s8l949whpm7w80zp9j283hq2f3we0sfng5e7',
    {
      name: 'Krogran Lending',
      type: ContractTypes.LENDING,
      profile:
        'https://miro.medium.com/v2/resize:fit:2400/1*_A3ZhnCP7aqerPgGQl3cng.png',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqf92y7l5guqyeym23uhaw8ms5r2zg0gym7vrs7074pq',
    {
      name: 'PawnWhale',
      type: ContractTypes.LENDING,
      profile:
        'https://pawnwhale.com/static/media/logo.96e2616a58188f9a2171.png',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqvpkd3g3uwludduv3797j54qt6c888wa59w2shntt6z',
    {
      name: 'XOXNO NFT Staking',
      type: ContractTypes.STAKING,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq50t0ma43rr3895lq7dhgm786kdvfwlyq386qafuqhu',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqnk6e6mrs0kdsusdt7hshpql6y4pcczwu386qjzhk63',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq67d2pnfg6f6td7lxq8x0rtzylhkt32gs386qh8vtv3',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqjengc6lmwh2lete065ndjczsf3dns7y3386qlteynl',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqz4wny33hhrnzsy4d9x3xzg749xpwe62f386qkwyw3x',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq5ycqhnggkjvqal259pmzauvg6rm2f232386qfsk5lc',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqmylu4uea0kce4pl5xez9d7kq5kwztykx386q664fe3',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqke7n6rljgcffhc7c5lwgsd9fxh2zkev4386q28vr73',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqgz3vsy7c3w5hw8vsmlzcchkyxmmg8q4r386qqs3ksl',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqw289yq0rr52l38kcft29yltzya3ymwhq386qawkhef',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq575mqgaqe4f53rqc5ssczkxtsx4fs26l3azq9zwkaw',
    {
      name: 'EAPES Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EAPES-8f3c1f/profilePicture.webp?ts=1726194773',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqspptxv47n4244qesp3gx828qz93thcaev28qtdenqc',
    {
      name: 'Warriorz Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/nftmedia/WARRIORZ-2f0986/WARRIORZ-2f0986-2366.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq034srtujsutvq7z93zmwdjeucr89cfnsxkuq38xg3n',
    {
      name: 'Salvaki Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/SAKI-bf4924/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqm027tmfepf7sxflr9pumgwf4gw2thtegxkuq38m2mu',
    {
      name: 'Salvadorian Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/SAC-c60db0/profilePicture.jpeg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq6esp4ztns8ppek5tn95rvx4edqaxc3k7kmgqy02jd0',
    {
      name: 'Pittz Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/PITTZ-1a4c2d/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqh438d42h9ltlqgpmjxc3srxafnx383n5kagq6hynlu',
    {
      name: 'Realm Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/REALM-579543/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqwjv6ru86mmlgvad54alm62xay0st5n5f4yuqdky79h',
    {
      name: 'TiredApes Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/TACC-73857e/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq0rkx70tmr3myr9uada9wez4kkymusw94a9rsn5y7tn',
    {
      name: 'Cantina Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/GSPACEAPE-08bc2b/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqxp6xre0k09yp586acwnp3kzqx0xn3gk5uslsram6y7',
    {
      name: 'Evoload Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://media.xoxno.com/collectionprofile/EVLDS-7e056e/profilePicture.webp',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqhpauarfmx75nf4pwxh2fuy520ym03p8e8jcqt466up',
    {
      name: 'JewelSwap',
      type: ContractTypes.LENDING,
      profile:
        'https://pbs.twimg.com/profile_images/1628519918780940290/GscnTfHP_400x400.jpg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqd7f32re7pj0xqha8zru8kgwsqepvhn8kdn3qxej29v',
    {
      name: 'Infinity Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqd7f32re7pj0xqha8zru8kgwsqepvhn8kdn3qxej29v/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqssc5tls4r9mzcl30n7wpng8jupjrdmnlp4ssqwpwc7',
    {
      name: 'Burnify Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqssc5tls4r9mzcl30n7wpng8jupjrdmnlp4ssqwpwc7/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqcl3dytkacwp0kkxwmykvag50rh5z27kw45qs5dmpk2',
    {
      name: 'XOXNO Private Sale',
      type: ContractTypes.PRIVATE_SALE,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqyq9mwxkq7zelkupafta5ah95pw6362j745qsk5mdzw',
    { name: 'XOXNO Lending', type: ContractTypes.LENDING, profile },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq4luh53qlc8ehlzmvxm06v0rs8r5q5p6h45qs9dx4vm',
    { name: 'XOXNO Lending', type: ContractTypes.LENDING, profile },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqsa43z3hxdhwfjgzw58pdvnyl5u4dx9pgch5st4knwr',
    {
      name: 'xLaunchpad',
      type: ContractTypes.LAUNCHPAD,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqpgqsa43z3hxdhwfjgzw58pdvnyl5u4dx9pgch5st4knwr/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqxxs3etvwccvq9fcg6cxczuvlp47cp8qtgzmqsqvfcg',
    { name: 'XOXNO xLaunchpad', type: ContractTypes.LAUNCHPAD, profile },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqc0jp2q280xaccqszxwsh5cyl2hv35g79ah0sk4zu5n',
    {
      name: 'XOXNO Migrate',
      type: ContractTypes.LENDING,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqfnarkmhu6tgjgtpenya0dek54jcwkak23g6su00nwn',
    {
      name: 'xBoard',
      type: ContractTypes.EXCHANGE,
      profile:
        'https://pbs.twimg.com/profile_images/1807422771192098817/Dbw48rVZ_400x400.jpg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq6uzdzy54wnesfnlaycxwymrn9texlnmyah0ssrfvk6',
    {
      name: 'XOXNO Liquid Staking',
      type: ContractTypes.LIQUID_STAKING,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqs5w0wfmf5gw7qae82upgu26cpk2ug8l245qszu3dxf',
    {
      name: 'XOXNO Liquid Staking',
      type: ContractTypes.LIQUID_STAKING,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqylllslmq6y6',
    {
      name: 'EGLD Staking',
      type: ContractTypes.STAKING,
      profile:
        'https://tools.multiversx.com/assets-cdn/accounts/erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqylllslmq6y6/icon.svg',
    },
  ],
  [
    'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg8llllsqra25h',
    {
      name: 'XOXNO EGLD Staking',
      type: ContractTypes.STAKING,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqg9fa0dmpn8fu3fnleeqn5zt8rl8mdqjkys5s2gtas7',
    {
      name: 'XOXNO Launchpad',
      type: ContractTypes.LAUNCHPAD,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgqarunmmq8vwaevtnr304wqkwladqc0n9645qsrwxs7f',
    {
      name: 'XOXNO Airdrop',
      type: ContractTypes.AIRDROP,
      profile,
    },
  ],
  [
    'erd1qqqqqqqqqqqqqpgq8538ku69p97lq4eug75y8d6g6yfwhd7c45qs4zvejt',
    {
      name: 'XOXNO Accumulator',
      type: ContractTypes.ACCUMULATOR,
      profile,
    },
  ],
]);
