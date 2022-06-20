const { AuthenticationError } = require('apollo-server-express');
const { User, Trip } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('trips')
                
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },

        trip: async (parent, { email }) => {
            const params = email ? { email } : {};
            return Trip.find(params).sort({ createdAt: -1 });
        },
        // trip: async (parent, { _id }) => {
        //     return Trip.findOne({ _id });
        // },
        user: async (parent, { email }) => {
            return User.findOne({ email })
                .select('-__v -password')
                .populate('trips')
        } 
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log(args);
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addTrip: async (parent, { tripName, category }, context) => {
            if (context.user) {
                const trip = await Trip.create({ tripName, category });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { trips: trip._id } },
                    { new: true }
                );

                return trip;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        
        
        // Mutation to remove a trip from a User
        removeTrip: async (parent, {  tripId }, context) => {
            // return trip.findOneAndDelete({ _id: tripId });
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { trips: tripId } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
       
    }
};

module.exports = resolvers;