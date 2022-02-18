import moment from 'moment'

export const BACKGROUND = 'https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1639402477084-7e98f693c98a?ixid=MnwxMjA3fDB8MXx0b3BpY3x8Ym84alFLVGFFMFl8fHx8fDJ8fDE2NDA4NjQwMTM&ixlib=rb-1.2.1&w=2560&fm=jpg'
export const APP_BLOCKS = [{
  row: -2,
  column: -4,
  head: {
    text: moment().format('HH:mm:ss'),
    style: {
      fontSize: '64px'
    }
  },
  body: moment().format('YYYY-MM-DD'),
  tail: moment().format('dddd'),
  type: 'clock',
  style: {
    color: 'white',
    backgroundColor: `transparent`
  }
}, {
  head: moment().format('HH:mm:ss'),
  body: {
    text: moment().format('YYYY-MM-DD'),
    style: {
      fontSize: '12px'
    }
  },
  tail: {
    text: moment().format('dddd'),
    style: {
      fontSize: '12px'
    }
  },
  type: 'clock',
  style: {
    backgroundColor: `white`
  }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  type: 'dialog',
  style: { backgroundColor: `white` }
}, {
  row: 1,
  column: 2,
  type: 'link',
  link: 'https://baidu.com',
  style: {
    backgroundSize: '80%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(https://www.baidu.com/img/flexible/logo/pc/result.png)`
  }
}, {
  row: 2,
  column: 2,
  head: {
    text: moment().format('HH:mm:ss'),
    style: {
      fontSize: '32px'
    }
  },
  body: moment().format('YYYY-MM-DD'),
  tail: moment().format('dddd'),
  type: 'clock',
  style: {
    backgroundColor: `white`
  }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  row: 4,
  column: 4,
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: {
    backgroundColor: `white`
  }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}, {
  head: 'head',
  body: 'body',
  tail: 'tail',
  style: { backgroundColor: `white` }
}]
