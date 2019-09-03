<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';

    @Component
    export class Sortable extends Vue
    {
        sort: string = '';

        descending: boolean = false;

        toggleDescending(): void
        {
            this.descending = ! this.descending;
        }

        updateRoute()
        {
            let query = {
                ...this.$route.query,
                page: '1'
            };

            if (this.sort) {
                query['sort'] = (this.descending ? '-' : '') + this.sort;

                this.$store.commit('app/INSERT', {
                    ui: {
                        pagination: {
                            sort: this.sort,
                            descending: this.descending
                        }
                    }
                });
            } else {
                if (query.hasOwnProperty('sort')) {
                    delete query['sort'];

                    this.$store.commit('app/INSERT', {
                        ui: {
                            pagination: {
                                sort: null,
                                descending: false
                            }
                        }
                    });
                }
            }

            this.$navigator.push({ path: this.$route.path, query});
        }

        created()
        {
            let sort = this.$route.query.sort as string;

            if (sort) {
                this.descending = sort.charAt(0) === '-';
                this.sort = this.descending ? sort.slice(1, sort.length) : sort;
            }
        }

        @Watch('sort')
        onSortChange()
        {
            this.updateRoute();
        }

        @Watch('descending')
        onDescendingChange()
        {
            this.updateRoute();
        }
    }

    export default Sortable;

</script>
