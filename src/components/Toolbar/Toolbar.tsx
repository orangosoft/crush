import { For, Show, createSignal } from 'solid-js'

import Bookmark from './Bookmark'
import NavigationBar from './NavigationBar'
import Tabs from './Tabs'
import { TrafficLights } from './TrafficLights'
import styles from './Toolbar.module.css'

// { title, url, onHomeClick }
export default function Toolbar(props: any) {
  const toolbarClass = styles.Toolbar + ' group'
  const navigationClass = styles.Navigation
  const onClick = props.onClick || (() => {})

  const [tabs, setTabs] = createSignal([
    { id: 1, name: 'Practice Fusion', url: 'https://static.practicefusion.com/apps/ehr/index.html#/PF/home/main', active: true },
    { id: 2, name: 'Athena', url: 'https://www.athenahealth.com/solutions/marketplace-partners' },
    { id: 3, name: 'Sneat', url: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/index.html' },
    { id: 4, name: 'LinkedIn', url: 'https://www.linkedin.com/in/roboncode/' },
    { id: 5, name: 'Facebook', url: 'https://www.facebook.com/' },
    { id: 6, name: 'Google', url: 'https://www.google.com/' },
    { id: 7, name: 'YouTube', url: 'https://www.youtube.com/' },
    { id: 8, name: 'Twitter', url: 'https://twitter.com/' },
    { id: 9, name: 'Instagram', url: 'https://www.instagram.com/' },
    { id: 10, name: 'Pinterest', url: 'https://www.pinterest.com/' },
    // { id: 11, name: 'Reddit', url: 'https://www.reddit.com/' },
    // { id: 12, name: 'TikTok', url: 'https://www.tiktok.com/' },
    // { id: 13, name: 'Twitch', url: 'https://www.twitch.tv/' },
    // { id: 15, name: 'Stack Overflow', url: 'https://stackoverflow.com/' },
    // { id: 16, name: 'CodePen', url: 'https://codepen.io/' },
    // { id: 17, name: 'CodeSandbox', url: 'https://codesandbox.io/' },
    // { id: 18, name: 'CodeChef', url: 'https://www.codechef.com/' },
    // { id: 19, name: 'CodeWars', url: 'https://www.codewars.com/' },
    // { id: 20, name: 'HackerRank', url: 'https://www.hackerrank.com/' },
    // { id: 21, name: 'HackerEarth', url: 'https://www.hackerearth.com/' },
  ])

  const [bookmarks, setBookmarks] = createSignal([])

  const onNavClick = (evt: any) => {
    // onClick(type, url)
    // require('electron').shell.openExternal("http://google.com");
    switch (evt.type) {
      case 'home':
        onClick('home')
        break
      case 'back':
        onClick('back')
        break
      case 'forward':
        onClick('forward')
        break
      case 'reload':
        onClick('reload')
        break
      case 'copy':
        onClick('copy')
        break
      case 'bookmark':
        onClick('bookmark')
        break
      case 'open':
        onClick('open')
        break
      case 'new':
        onClick('new')
        break
      case 'close':
        onClick('close')
        break
      case 'minimize':
        onClick('minimize')
        break
      case 'maximize':
        onClick('maximize')
        break
      default:
        break
    }
  }

  const onBookmarkClick = bookmark => {
    console.log('onBookmarkClick --', bookmark)
    onClick('bookmark', bookmark.url)
  }

  const onBookmarkPinClick = bookmark => {
    console.log('onBookmarkPinClick --', bookmark)
    toggleBookmark(bookmark)
  }

  const toggleBookmark = bookmark => {
    // if not bookmarked, add bookmark
    // if bookmarked, remove bookmark
    bookmark.pinned = !bookmark.pinned
    const index = bookmarks().findIndex(b => b.url === bookmark.url)
    if (index === -1) {
      setBookmarks([...bookmarks(), bookmark])
    } else {
      const newBookmarks = bookmarks()
      newBookmarks.splice(index, 1)
      setBookmarks(newBookmarks)
    }
  }

  const onTabsChange = changeEvent => {
    console.log('onTabsChange', changeEvent)
    switch (changeEvent.type) {
      case 'add':
        setTabs([...tabs(), changeEvent.item])
        break
      case 'remove':
        const newItems = tabs()
        const index = newItems.findIndex(item => item.id === changeEvent.item.id)
        newItems.splice(index, 1)
        setTabs(newItems)
        break
      case 'select':
        // const newItems = items()
        // newItems.forEach(item => {
        //   item.active = item.id === changeEvent.item.id
        // }
        // setItems(newItems)
        break
      case 'move':
        break
    }
  }

  return (
    <div class={toolbarClass}>
      <div class={`bg-neutral-900 h-3 w-full ${styles.Draggable}`}></div>
      <div class={navigationClass} onDblClick={() => onClick('maximize')}>
        <TrafficLights enabled={true} onClick={onNavClick} />
        <Tabs items={tabs} onChange={onTabsChange} />
      </div>
      <div>
        <NavigationBar url={props.url} onClick={onNavClick} />
        <Show when={bookmarks().length > 0}>
          <div class="flex flex-grow gap-2 px-3 py-2 text-xs">
            <For each={bookmarks()}>
              {bookmark => (
                <Bookmark
                  title={bookmark.title}
                  url={bookmark.url}
                  pinned={bookmark.pinned}
                  onClick={onBookmarkClick}
                  onPinClick={onBookmarkPinClick}
                />
              )}
            </For>
            {/* <Bookmark title={props.title} url={props.url} onClick={onBookmarkClick} onPinClick={onBookmarkPinClick} /> */}
          </div>
        </Show>
      </div>
    </div>
  )
}
