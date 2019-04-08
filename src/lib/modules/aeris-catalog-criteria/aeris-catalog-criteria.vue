<template>
  <div data-aeris-catalog-criteria>
    <slot />
  </div>
</template>

<script>
export default {
  name: "aeris-catalog-criteria"
};
</script>

<style scoped>
[data-aeris-catalog-criteria] {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
}

[data-aeris-catalog-criteria] span {
  font-weight: 300;
}

[data-aeris-catalog-criteria] h3 {
  font-size: 1rem;
  font-weight: 400;
}
</style>
