<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm offset-sm3>
				<h2>Create a new Meetup</h2>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<form @submit.prevent="onCreateMeetup">
					<!-- input title -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>


							<v-text-field
							  name="title"
							  label="Title"
							  id="title"
							  v-model="title"
							  required>
						    </v-text-field>

						</v-flex>
					</v-layout>
					<!-- end input title -->

					<!-- input location -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>


							<v-text-field
							  name="location"
							  label="Location"
							  id="location"
							  v-model="location"
							  required>
							</v-text-field>

						</v-flex>
					</v-layout>
					<!-- end input location -->

					<!-- input image -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>


							<v-text-field
							  name="imageURL"
							  label="Image URL"
							  id="imageURL"
							  v-model="imageUrl"
							  required>
							</v-text-field>

						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>


							<img :src="imageUrl" alt="" height="200">

						</v-flex>
					</v-layout>
					<!-- end input image -->

					<!-- input Description -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>


							<v-text-field
							  name="description"
							  label="Description"
							  id="description"
							  v-model="description"
							  multi-line
							  required>
							</v-text-field>

						</v-flex>
					</v-layout>
					<!-- end input Description -->

					<!-- datepicker -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<h4>Choose data & time</h4>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-date-picker v-model="date"></v-date-picker>
							{{ date }}
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-time-picker v-model="time" format="24hr"></v-time-picker>
							{{ time }}
						</v-flex>
					</v-layout>
					<!-- end datepicker -->

					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>

							<v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>

						</v-flex>
					</v-layout>

					{{submittableDateTime}}

				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

export default {
	data () {
		return {
			title: '',
			location: '',
			imageUrl: '',
			description: '',
			date: new Date(),
			time: new Date()
		}
	},
	computed: {
		formIsValid () {
			return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
		},
		submittableDateTime () {
			const date = new Date(this.date)
			if (typeof this.time === 'string'){
				const hours = this.time.match(/^(\d+)/)[1]
				const minutes = this.time.match(/:(\d+)/)[1]
				date.setHours(hours)
				date.setMinutes(minutes)
			} else {
				date.setHours(this.time.getHours())
				date.setMinutes(this.time.getMinutes())
			}

			console.log(date)
			return date
		}
	},
	methods: {
		onCreateMeetup () {
			if(!this.formIsValid) {
				return
			}
			const meetupData = {
				title: this.title,
				location: this.location,
				imageUrl: this.imageUrl,
				description: this.description,
				date: this.submittableDateTime
			}
			this.$store.dispatch('createMeetup', meetupData)
			this.$router.push('/meetups')
		}
	}
}

</script>
