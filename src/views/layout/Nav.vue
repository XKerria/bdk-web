<script lang="jsx">
import { defineComponent } from 'vue'
import UiIcon from '@/components/ui/Icon.vue'
import { useRouter } from 'vue-router'
import { routes as allRoutes } from '@/router'

export default defineComponent(() => {
  const router = useRouter()
  const routes = allRoutes.find((i) => i.path === '/')?.children ?? []

  const onClick = (item) => {
    router.push({ name: item.name })
  }

  const generate = (item) => {
    if (item?.children?.length) {
      const slots = {
        title: () => <span>{item.meta.title}</span>,
        icon: () => <UiIcon type={item.meta.icon} />
      }
      return (
        <ASubMenu v-slots={slots} key={item.name}>
          {item.children.map((i) => generate(i))}
        </ASubMenu>
      )
    } else {
      const slots = {
        default: () => <span>{item.meta.title}</span>,
        icon: () => <UiIcon type={item.meta.icon} />
      }
      return <AMenuItem v-slots={slots} key={item.name} onClick={() => onClick(item)} />
    }
  }

  const comp = routes.map((i) => generate(i))
  return () => (
    <AMenu mode='inline' class='menu'>
      {comp}
    </AMenu>
  )
})
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  overflow-y: auto;
}
</style>
