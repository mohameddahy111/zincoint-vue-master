<template>
  <div class="q-pa-md">
    <q-btn-dropdown icon="account_circle" unelevated>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <div class="text-body1 text-capitalize">
            <q-list dese>
              <q-item clickable class=" q-px-lg" >
                <q-item-section thumbnail  >
                  <q-icon name="account_circle" />
                  </q-item-section>
                  <q-item-section>
                  <RouterLink class="q-btn-item" to="/profile">
                    profile
                  </RouterLink>
                </q-item-section>
              </q-item>
              <q-item clickable class=" q-px-lg"  >
                <q-item-section thumbnail>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section >
                  <RouterLink class="" to="/setting">
                    setting
                  </RouterLink>
                </q-item-section>
              </q-item>
              <q-item clickable class=" q-px-lg"  >
                <q-item-section thumbnail>
                  <q-icon name="favorite_border" />
                </q-item-section>
                <q-item-section >
                  <RouterLink class="q-btn-item" to="/favorite">
                    favorite List
                  </RouterLink>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="~assets/images/null-avatar.jpg" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

          <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserAvatarLayout",
  setup() {
    return {
      mobileData: ref(false),
      bluetooth: ref(false),
    };
  },
};
</script>
<style scoped>
a{
  text-decoration: none;
  color: black;
}
</style>
