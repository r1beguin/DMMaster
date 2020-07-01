const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
    {
        fightbarDocking: {
            type: Number,
            default: 0
        },
        undockedFightbarVertical: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false
    }
);

module.exports =
{
    Settings: mongoose.model("Settings", SettingsSchema),
}
