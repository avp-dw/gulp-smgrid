module.exports = {
    outputStyle: 'scss', 
    columns: 12, 
    offset: '30px', 
    mobileFirst: false, 
    container: {
        maxWidth: '1230px', 
        fields: '30px' 
    },
    breakPoints: {
        lg: {
            width: '1200px' 
        },
        md: {
            width: '992px'
        },
        sm: {
            width: '768px',
            fields: '15px'              
        },
        xs: {
            width: '576px'
        }
    }    
};