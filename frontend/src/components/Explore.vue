<template>
  <div class="explore">
    <md-card md-with-hover>
      <md-ripple>
        <md-field>
            <label for="myin"></label>
            <md-input name="myin" type="text"></md-input>
        </md-field>
        <md-button class="md-accent md-raised">Button</md-button>
      </md-ripple>
    </md-card>

    
    
    
  </div>
</template>

<script>
export default {
  name: 'Explore',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-card {
    width: 50%;
    height: 500px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>