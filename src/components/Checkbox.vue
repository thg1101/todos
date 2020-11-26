<template functional>
  <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="checkbox"
    :width="props.size"
    :height="props.size"
  >
    <!-- wrap the svg paths in an anchor to allow the element to be tabbable, add handlers to it -->
    <a xlink:href="#"
      @click.prevent="listeners.click"
      @keydown.space="listeners.click"
    >
      <!-- an transparent square to serve as a click area -->
      <rect width="24" height="24" fill="#f0f0f0" fill-opacity="0" />
      <!-- empty checkbox outline -->
      <path v-if="!props.done" d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
      <!-- checked checkbox -->
      <path v-else d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.29 13.29c-.39.39-1.02.39-1.41 0L5.71 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.58 7.59z"/>
    </a>
  </svg>
</template>
