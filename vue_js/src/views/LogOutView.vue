<script lang="ts">
import authStore from "@/store/authStore";

export default {
  created() {
    authStore.dispatch("logout");
    return this.$router.replace("/");
  },
};
</script>
