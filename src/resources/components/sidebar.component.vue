<template>
    <div class="sidebar" data-color="white" data-active-color="danger">
        <div class="logo">
            <a href="#" class="simple-text logo-mini">
                <div class="logo-image-small">
                    <!--            <img src="../assets/img/logo-small.png">-->
                </div>
                <!-- <p>CT</p> -->
            </a>

            <select class="simple-text logo-normal border-0 cursor-pointer" aria-label="Default select example" v-model="super_admin.company_id" @change="set_filter($event)"
                    v-if="profile.role == 'super_admin'">
                <option value="0">Super Admin</option>
                <option v-for="(value,key) in users" :value="value.id">{{ value.name }}</option>

            </select>
            <a href="#" class="simple-text logo-normal" v-else>
                Admin
                <div class="logo-image-big">
                    <!--          <img src="../assets/images/logo.png">-->
                </div>
            </a>
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">
                <!--                <router-link tag="li" :to="{name: value.path}" active-class="active"-->
                <!--                             v-for="(value,key) in pages" :key="key" exact>-->
                <!--                    <a href="javascript:;">-->
                <!--                        <i :class="value.icon"></i>-->
                <!--                        <p>{{ value.name }}</p>-->

                <!--                    </a>-->
                <!--                </router-link>-->

                <li v-for="(value, key) in pages" :key="key" v-if="is_permission_exist(value.permission)">
                    <router-link tag="a" :to="{ name: value.path }" v-if="!value.parent">
                        <i :class="value.icon"></i>
                        <p>{{ value.name }}</p>

                    </router-link>
                    <template v-else>
                        <a data-toggle="collapse" :href="`#${value.id}`" class="" aria-expanded="true">
                            <i :class="value.icon"></i>
                            <p>{{ value.name }} <b class="caret"></b></p>
                        </a>
                        <div class="collapse" :id="`${value.id}`" style="">
                            <ul class="nav nav-child">
                                <li v-for="(value, key) in value.children">
                                    <router-link tag="a" :to="{ name: value.path }">
                                        <p class="child-item">{{ value.name }}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {pages} from "@/shared/mockup/pages.mockup";
import {userService} from "../../services/users/user.service";
import {permissionService} from "../../services/permission/permission.service";

export default {
    data: () => {
        return {
            pages: pages,
            profile: {},
            filter: {
                per_page: 10,
                paginate: 0,
                roles: "company",
                exclude_from_company_injection: true
            },
            users: [],
            super_admin: {},
            permissions: []
        };
    },
    async mounted() {
        this.profile = this.$storage.get("profile");
        await this.init_permissions({role: this.profile.role, paginate: 0});
        if(this.profile.role == "super_admin"){
            await this.list(this.filter);
             this.super_admin= this.$storage.get("super_admin_filter");
        }

    },
    methods: {
        async list(query) {
            const response = await userService.list(query);
            this.users = response.data;

        },
        async init_permissions(query){
          const response   = await permissionService.list(query);
          this.permissions = response.data;

          console.log( this.permissions);
        },
        async set_filter($event){
           this.$storage.set('super_admin_filter', {company_id: $event.target.value});

           location.reload();
        },
        is_permission_exist(key){
            let exist = true;

            let result =  this.permissions.find(el => el.key == key);
            if(!result){
                exist = false;
            }

            return exist;
        }
    }
};
</script>
